# Evenue: Order of System Development

This is the suggested build order, sequenced so that each stage produces something testable and each later stage only depends on modules that already exist. It follows the module boundaries in `architectural.md`.

## Stage 1 Foundation
**Module: Identity & Access**
- User model, auth (sign up/login/sessions), role field (offeror / booker / admin)
- Route protection middleware by role
- *Why first:* every other module needs to know who's making a request and what they're allowed to do.

## Stage 2 Supply Side
**Module: Space (Listing) Management**
- Space CRUD (offeror-only), photo upload wiring (basic File Management support), availability calendar, pricing fields
- Public-facing space search/browse (read path for bookers, even before booking exists)
- *Why second:* there's nothing to book until spaces exist. This also lets you demo "supply" early, which is useful for showing offerors something concrete.

## Stage 3 Core Transaction Loop
**Module: Booking Management**
- Booking request creation (booker), approval/decline (offeror)
- Booking status machine: pending → confirmed / declined → cancelled → completed
- Double-booking prevention against Space availability
- Booking messages thread
- *Why third:* this is the marketplace's core loop. At the end of this stage you have a functional (unpaid) two-sided marketplace worth validating before wiring up money.

## Stage 4 Money
**Module: Payment & Transactions**
- Paystack integration behind the `PaymentProvider` interface
- Charge-on-approval flow tied to the `pending → confirmed` transition
- Platform fee calculation, offeror payout ledger
- Refund handling (once cancellation policy is finalized)
- *Why fourth:* payments should sit on top of a booking flow that's already proven to work, so you're not debugging business logic and payment integration at the same time.

## Stage 5 Trust Layer
**Module: Review & Reputation**
- Post-completion review prompts
- Aggregate ratings on space listings
- *Why fifth:* reviews only make sense once bookings can actually reach `completed`, which requires Stages 1–4 to exist.

## Stage 6 Retention & Ops
**Modules: Notification & Communication, Administration**
- Notification module: booking lifecycle emails (requested/approved/declined/cancelled/reminder)
- Admin module: listing approval queue, dispute handling, platform analytics dashboard
- *Why last:* these are important for running the business day-to-day, but the platform is usable end-to-end without them during early development/testing they wrap around a working core rather than gating it.

## Suggested MVP Cutline

If you need a "smallest thing that's a real product" cutline, Stages 1–4 are the MVP. Stages 5–6 make it operable and trustworthy at scale, but a version without them can still complete a real transaction end to end.
