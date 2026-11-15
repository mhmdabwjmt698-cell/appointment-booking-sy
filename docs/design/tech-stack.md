# ADR-001: Technology Stack

**Status:** Accepted
**Date:** 2026-11-16
**Decided by:** Mohammad Abu Jumaa (محمد أبو جمعة)

## Context

The system is a clinic appointment booking app built by one developer in 5 to 6 weeks (see [SRS](../requirements/SRS.md)). The decision has to support these requirements:

- No double booking, even with simultaneous requests (FR-10, NFR-7).
- Works on mobile screens (NFR-10).
- Role-based access and secure passwords (NFR-3, NFR-4, NFR-5).
- Automated tests for the main flows (NFR-12).
- Published on a public URL (NFR-13).

## Decision

| Layer | Choice |
|-------|--------|
| Frontend | React with Vite, React Router, plain CSS (mobile first) |
| Backend | Node.js (current LTS version) with Express |
| Database | MongoDB, using Mongoose in the backend |
| Authentication | JWT, passwords hashed with bcrypt |
| Validation | A schema validation library on the server (for example Zod) |
| API documentation | OpenAPI file in `docs/design/openapi.yaml` |
| Backend tests | Jest and Supertest |
| Frontend tests | Vitest and React Testing Library |
| CI | GitHub Actions (run tests on every push) |
| Packaging | Docker |
| Hosting | Render for the backend and the frontend, MongoDB Atlas for the database |

## Reasons

1. **One language everywhere.** JavaScript in the frontend and backend means less to learn and one set of tools for a solo developer.
2. **MongoDB fits the design.** The collections and indexes are already designed in [er-diagram.md](er-diagram.md) and [schema.js](schema.js).
3. **Double booking is solved in the database.** The unique index on `(providerId, slotStart)` plus a transaction guarantees one winner. MongoDB transactions need a replica set, and MongoDB Atlas provides one by default.
4. **React with Vite.** It is the most common choice with this backend, has many learning resources, and a fast development setup. Plain CSS with a mobile-first approach keeps the project simple.
5. **Express is small and well known.** It keeps the API easy to match with the OpenAPI file.
6. **JWT with bcrypt** meets NFR-3 and NFR-4 with well-tested libraries.
7. **Jest and Supertest** can send many simultaneous requests to the API. This is how the double-booking test (NFR-7) will be written.

## Alternatives considered

| Option | Why not chosen |
|--------|----------------|
| PostgreSQL | Strong for this kind of data and has exclusion constraints, but the design, schema script and topics are already built around MongoDB. |
| Plain HTML, CSS and JavaScript frontend | Simpler to start, but the admin dashboard and booking screen need state and routing, which React handles better. |
| Next.js | More than a single clinic app needs, and it adds server-rendering concepts to learn. |
| NestJS or Fastify | Good frameworks, but Express is simpler for a first full-stack project. |
| Firebase or other backend-as-a-service | Hides the part this project is meant to demonstrate: designing and building the backend. |

## Consequences

**Good**
- Fast start, one language, a stack that employers and teams commonly use.
- The most critical rule (no double booking) is enforced by the database.

**Trade-offs and things to watch**
- MongoDB transactions require a replica set. Local development must use a single-node replica set, or tests use an in-memory replica set.
- There are no database-level foreign keys, so the API must check that `providerId` and `serviceId` exist.
- A service duration must be a multiple of the slot length. This is enforced by the API, not by the database.
- Free hosting tiers can be slow to wake up. This is acceptable for a portfolio project, and the limits should be checked again at deployment time (T43).

## Planned project structure

```
appointment-booking-system/
  backend/      Express API, Mongoose models, tests
  frontend/     React app (Vite)
  docs/         requirements, design, testing
  README.md
```

## Follow-up

- [ ] Update the Tech Stack section in `README.md` with this table.
- [ ] Create the `backend` and `frontend` folders at the start of the development phase.
