# Evenue

A three-party venue booking marketplace connecting **offerors** (space owners), **bookers** (event organizers) and **admins** (platform operators).

## What it does

Offerors list venues/spaces with availability, capacity, amenities, and pricing. Bookers search for a space, submit a booking request, and pay once the offeror approves. Admins oversee listing approvals, disputes, and platform-wide operations.

## Core flow

1. Offeror lists a space
2. Booker requests a booking for a date/time (**Request to Book** not instant confirm)
3. Offeror approves or declines
4. On approval, payment is charged via **Paystack** and the booking is confirmed
5. Booking completes after the event date passes; booker can leave a review

## Tech direction

- **PERN Stack** (PostgreSQL, Express, React, Node.js) with **shadcn** for UI
- **Domain-driven module boundaries** in the backend, internal event-driven communication between modules
- **Paystack** for payments, integrated behind a swappable payment-provider interface
- Modules: Identity & Access, Organization & Profile Management, Space (Listing) Management, Booking Management, Payment & Transactions, Review & Reputation, Notification & Communication, Administration, File Management

See `architectural.md` for the full module breakdown and design principles, and `system-development-order.md` for the recommended build sequence.

## Status

Early-stage architecture and build order defined; cancellation/refund policy still to be finalized before the Payment module is complete.

## Market

Primarily targeted at the Ghanaian market, with Paystack as the initial payment rail.
