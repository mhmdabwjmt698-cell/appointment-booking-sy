# Booking Sequence Diagrams

How a booking is created (FR-9, FR-10, US-5), and how the system stays safe when two customers book the same time.

## 1. Booking flow

```mermaid
sequenceDiagram
    autonumber
    actor C as Customer
    participant UI as Web app
    participant API as API server
    participant DB as MongoDB

    C->>UI: Choose service, doctor and date
    UI->>API: GET /availability (serviceId, providerId, date)
    API->>DB: Read working hours, time off and booked slots
    DB-->>API: Data
    API-->>UI: List of available slots
    UI-->>C: Show available times

    C->>UI: Pick a time and press Confirm
    UI->>API: POST /bookings (token, serviceId, providerId, startAt)
    API->>API: Check token and validate input

    alt Invalid token or invalid input
        API-->>UI: 401 or 400
        UI-->>C: Show error
    else Valid request
        API->>DB: Read service and provider
        DB-->>API: Service duration
        API->>API: Compute endAt and the list of slots
        API->>API: Check slots are inside working hours and not in the past
        API->>DB: Start transaction
        API->>DB: Insert booking (status confirmed)
        API->>DB: Insert one booking_slot per slot
        alt A slot is already taken (duplicate key on providerId + slotStart)
            DB-->>API: Duplicate key error
            API->>DB: Abort transaction (nothing is saved)
            API-->>UI: 409 slot taken
            UI-->>C: This time was just taken, choose another one
            UI->>API: GET /availability (reload times)
        else All slots are free
            API->>DB: Commit transaction
            DB-->>API: OK
            API-->>UI: 201 booking
            UI-->>C: Show confirmation
        end
    end
```

## 2. Two customers book the same time

```mermaid
sequenceDiagram
    participant A as Customer A
    participant B as Customer B
    participant API as API server
    participant DB as MongoDB

    A->>API: POST /bookings (10:00)
    B->>API: POST /bookings (10:00)
    API->>DB: Transaction A inserts booking and slot 10:00
    API->>DB: Transaction B inserts booking and slot 10:00
    DB-->>API: A succeeds
    DB-->>API: B fails (duplicate key)
    API-->>A: 201 confirmed
    API-->>B: 409 slot taken
    Note over DB: The unique index on providerId + slotStart decides the winner, not the application code
```

## Design notes

1. **The database has the last word.** Checking availability before inserting is not enough, because two requests can pass the check at the same moment. The unique index on `(providerId, slotStart)` in `booking_slots` makes the second insert fail (risk R1, FR-10, NFR-7).
2. **One transaction.** The booking and all its slots are saved together or not at all, so a failed booking never leaves half-reserved slots behind.
3. **Longer services.** A 60-minute service on a 30-minute grid takes two slots (10:00 and 10:30). A second booking that needs the 10:30 slot fails on the same index, so overlaps are blocked too.
4. **The server calculates everything.** The client sends only `serviceId`, `providerId` and `startAt`. The server computes `endAt`, the slots and the price from its own data (NFR-6).
5. **Clear error for the user.** `409` carries a message the screen can show, then the screen reloads the available times.

## Automated test (NFR-7)

Send 10 booking requests for the same provider and slot at the same time. The test passes only if exactly one request returns `201`, the other nine return `409`, and the database holds exactly one booking and one slot for that time.

## Traceability

| Item | Covered by |
|------|------------|
| FR-8 Available slots | Part 1, steps 1 to 6 |
| FR-9 Book a slot | Part 1, confirm and insert |
| FR-10 No double booking | Unique index and transaction, Part 2 |
| NFR-7 Automated test | Test described above |
| NFR-8 UTC | `startAt` and `endAt` are sent and stored in UTC |

