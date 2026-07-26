# Evenue: Architecture

Evenue is a three-party venue booking marketplace split into two deployables based on the **PERN stack** with **shadcn**:

- **Frontend: React with shadcn** public/SEO-facing pages (space search/browse, listing pages), authenticated UI for all three roles, and thin calls into the backend API. No core business logic lives here.
- **Backend: Node.js + Express + PostgreSQL** a **modular monolith** holding all domain logic, the database, webhook handling (Paystack), background jobs, and scheduled tasks.

Internally, the Express backend is organized into well-bounded modules communicating through defined interfaces and domain events, rather than direct cross-module database access. This keeps development speed high for an early-stage product while leaving a clean seam to extract modules into services later if scale ever demands it.

**The three parties:**
- **Offerors** list and manage venues/spaces
- **Bookers** search, request, and pay for space bookings
- **Admins** approve listings, moderate disputes, oversee the platform

## Why the split

A pure frontend framework alone struggles with three things this platform needs: reliable Paystack webhook processing (idempotency/retries), multi-step transactional workflows (charge + notify + ledger entry together) and scheduled/background jobs (reminders, auto-expiring stale requests, payout batches). Express/Node with PostgreSQL gives all three a proper home a persistent process that can run a job queue and long-lived workers, complementing the React frontend rather than forcing everything into serverless functions.

## Architectural Principles

1. **Modular monolith on the backend, not a distributed system.** One Express codebase, one deployment, one database (schema-per-module boundaries enforced in code, not infra).
2. **Domain-driven module boundaries.** Each module owns its own tables and business rules. No module reaches into another module's tables directly.
3. **Event-driven communication between modules.** Modules publish domain events (e.g. `booking.approved`, `payment.captured`) that other modules subscribe to, instead of calling each other's internals synchronously wherever avoidable.
4. **Strategy pattern for payments.** Paystack is the initial (and likely only, given Ghana market focus) payment strategy, but the payment module is built behind an interface so alternate providers could be added later without touching booking logic.
5. **Explicit state machines for core workflows.** Booking status transitions are modeled explicitly, not inferred from scattered boolean flags.
6. **React stays thin.** The frontend never talks to the database directly and never owns business rules it calls the Express API and renders the result.

## Core Domain Abstraction

The central object in the system is the **Booking Request**, which flows through a defined lifecycle:

```
pending → confirmed (offeror approves, Paystack charge triggered)
        → declined (offeror rejects, nothing charged)
confirmed → cancelled (either party, subject to cancellation policy)
confirmed → completed (event date passes)
```

## Modules

### 1. Identity & Access
- User accounts, authentication, role assignment (offeror / booker / admin)
- Session management, password reset, verification status

### 2. Organization & Profile Management
- Offeror business/profile details
- Booker profile details
- Verification/trust signals surfaced to the other party

### 3. Space (Listing) Management
- Venue/space CRUD: name, description, address, geo-coordinates, capacity, amenities, photos
- Pricing (hourly/daily rates)
- Availability calendar and blackout dates
- Listing status (draft / active / inactive)

### 4. Booking Management
- Booking requests, the approval workflow (Request to Book), and the full booking status machine described above
- Booker–offeror messaging thread scoped to a specific booking
- Enforces availability rules against the Space module (no double-booking)

### 5. Payment & Transactions
- Paystack integration behind a `PaymentProvider` interface (strategy pattern), so the concrete provider can be swapped later
- Paystack webhook endpoint lives in the Express backend, with signature verification and idempotent processing (so a retried webhook delivery doesn't double-charge or double-confirm a booking)
- Charge-on-approval flow: charge is only triggered when a booking transitions `pending → confirmed`
- Platform fee calculation and offeror payout tracking
- Refunds, tied to the (still-to-be-finalized) cancellation policy

### 6. Review & Reputation
- Post-booking reviews from bookers about spaces/offerors
- Aggregate ratings surfaced on listings

### 7. Notification & Communication
- Transactional notifications: booking requested, approved, declined, cancelled, upcoming reminders
- Channel-agnostic dispatch (email first; SMS/WhatsApp are natural additions given the Ghana market)
- Scheduled reminders and stale-request expiry run as background jobs in the Express backend (a job queue such as BullMQ, or a simple cron-style worker to start)

### 8. Administration
- Listing approval queue
- Dispute handling
- Platform-wide transaction and fee visibility
- Basic analytics (bookings over time, GMV, approval/decline rates)

### 9. File Management
- Venue photo uploads and storage
- Shared across Space Management (listing photos) and potentially Review module (photo reviews) later

## Cross-Cutting Concerns

- **Event bus**: an internal event emitter within the Express backend (in-process, not a message queue at this stage) lets modules react to state changes without tight coupling e.g. Notification listens for `booking.confirmed` without Booking Management knowing Notification exists.
- **Authorization**: role checks are centralized in Identity & Access and enforced at the API/route boundary of every module, not duplicated per-module. The React frontend passes the authenticated user's token through to the backend on every request rather than making its own authorization decisions.
- **Money handling**: all monetary calculations (platform fee, payouts, refunds) live in the Payment module only no module does its own arithmetic on prices.
- **API boundary**: the Express backend exposes a versioned REST (or similar) API; React is the only consumer for now, but the boundary is clean enough that a mobile app could consume the same API later.

## Open Decisions

- Cancellation/refund policy tiering not yet finalized, but the Payment and Booking modules are built to accept a policy object rather than hardcoded rules, so this can be filled in without a redesign.
