# Requirements

## Functional Requirements (what the system does)

| ID | Requirement | Related stories |
|----|-------------|-----------------|
| FR-1 | The system shall let a visitor register with name, email and password. | US-1 |
| FR-2 | The system shall let a user log in and log out. | US-2, US-8 |
| FR-3 | The system shall support two roles: Customer and Admin. | US-8 |
| FR-4 | The system shall show the list of active services with duration and price. | US-3 |
| FR-5 | The system shall let an admin add, edit and delete services. | US-9 |
| FR-6 | The system shall let an admin define weekly working hours per provider. | US-10 |
| FR-7 | The system shall let an admin block days off or time ranges. | US-14 |
| FR-8 | The system shall calculate and show available slots for a service and date. | US-4 |
| FR-9 | The system shall let a customer book an available slot. | US-5 |
| FR-10 | The system shall prevent two bookings for the same slot, even under simultaneous requests. | US-5, US-12 |
| FR-11 | The system shall let a customer cancel their own booking and release the slot. | US-6 |
| FR-12 | The system shall let a customer reschedule a booking. | US-13 |
| FR-13 | The system shall show a customer their upcoming and past bookings. | US-7 |
| FR-14 | The system shall show an admin today's schedule and all bookings. | US-11 |
| FR-15 | The system shall let an admin create and cancel bookings manually. | US-12 |
| FR-16 | The system shall let an admin filter and search bookings by date or patient name. | US-15 |

## Non-Functional Requirements (how the system behaves)

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-1 | Performance | Available slots load in under 2 seconds for a normal day. |
| NFR-2 | Performance | A booking request completes in under 1 second under normal load. |
| NFR-3 | Security | Passwords are stored hashed (bcrypt or similar), never in plain text. |
| NFR-4 | Security | Admin pages and APIs are accessible only to users with the Admin role. |
| NFR-5 | Security | A customer can read and change only their own bookings. |
| NFR-6 | Security | All inputs are validated on the server; secrets are kept out of the code. |
| NFR-7 | Reliability | No double booking under any condition, verified by an automated test. |
| NFR-8 | Data | All times are stored in UTC and shown in the clinic's time zone. |
| NFR-9 | Usability | A customer can complete a booking in under 2 minutes. |
| NFR-10 | Usability | The interface works on mobile screens (responsive). |
| NFR-11 | Compatibility | Works on the latest versions of Chrome, Firefox, Safari and Edge. |
| NFR-12 | Maintainability | Code is versioned on GitHub and the main flows are covered by automated tests. |
| NFR-13 | Deployability | The app is published on a public URL with setup instructions in the README. |

---

## Priorities (MoSCoW)

### Functional requirements

| ID | Priority | Note |
|----|----------|------|
| FR-1 | Must | Registration |
| FR-2 | Must | Login and logout |
| FR-3 | Must | Customer and Admin roles |
| FR-4 | Must | Service list |
| FR-5 | Must | Manage services |
| FR-6 | Must | Working hours |
| FR-7 | Should | Days off and blocked times |
| FR-8 | Must | Available slots |
| FR-9 | Must | Book a slot |
| FR-10 | Must | No double booking, the core of the system |
| FR-11 | Must | Cancel a booking |
| FR-12 | Should | Reschedule |
| FR-13 | Must | My bookings |
| FR-14 | Must | Admin schedule |
| FR-15 | Must | Manual booking by admin |
| FR-16 | Should | Filter and search |

### Non-functional requirements

| ID | Priority | Note |
|----|----------|------|
| NFR-1 | Should | Slots load in under 2 seconds |
| NFR-2 | Should | Booking completes in under 1 second |
| NFR-3 | Must | Hashed passwords |
| NFR-4 | Must | Admin-only access |
| NFR-5 | Must | Customers see only their own bookings |
| NFR-6 | Must | Server-side validation |
| NFR-7 | Must | Automated test for double booking |
| NFR-8 | Must | UTC storage |
| NFR-9 | Should | Booking in under 2 minutes |
| NFR-10 | Must | Responsive on mobile |
| NFR-11 | Should | Latest browsers |
| NFR-12 | Should | Automated tests for main flows |
| NFR-13 | Must | Public URL and README |

### Could and Won't (not part of v1)

| Priority | Item |
|----------|------|
| Could | Email or SMS reminders |
| Could | Guest booking without an account |
| Could | Calendar view |
| Won't | Online payments |
| Won't | Native mobile app |
| Won't | Multiple clinics (multi-tenant) |
| Won't | Multiple languages |
| Won't | Google Calendar integration |

### Summary
- Functional: 13 Must, 3 Should
- Non-functional: 8 Must, 5 Should
- If development runs late, Should items are cut first (see risk R4 in `docs/risks.md`).
