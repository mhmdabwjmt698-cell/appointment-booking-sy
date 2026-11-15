# User Stories

Format: **As a** [role], **I want** [goal], **so that** [benefit].

## Customer

| ID | Story | Priority |
|----|-------|----------|
| US-1 | As a customer, I want to create an account, so that I can book and track my appointments. | Must |
| US-2 | As a customer, I want to log in with my email and password, so that I can access my bookings. | Must |
| US-3 | As a customer, I want to see the list of services with their duration and price, so that I know what to choose. | Must |
| US-4 | As a customer, I want to see the available time slots for a service on a given date, so that I can pick a time that suits me. | Must |
| US-5 | As a customer, I want to book an available time slot, so that I secure my place without calling, knowing nobody else can take the same slot. | Must |
| US-6 | As a customer, I want to cancel my appointment, so that the slot is freed if I cannot attend. | Must |
| US-7 | As a customer, I want to see my upcoming and past bookings, so that I remember my appointments. | Must |
| US-13 | As a customer, I want to reschedule my appointment, so that I do not have to cancel and book again. | Should |

## Admin

| ID | Story | Priority |
|----|-------|----------|
| US-8 | As an admin, I want to log in with an admin account, so that only I can access the dashboard. | Must |
| US-9 | As an admin, I want to add, edit and delete services (name, duration, price), so that the list stays up to date. | Must |
| US-10 | As an admin, I want to set weekly working hours for each provider, so that patients only see valid time slots. | Must |
| US-11 | As an admin, I want to see today's schedule and all bookings, so that I know who is coming and when. | Must |
| US-12 | As an admin, I want to create or cancel a booking manually, so that I can serve patients who call by phone. | Must |
| US-14 | As an admin, I want to mark days off or exceptions in the schedule, so that nobody books on a day the clinic is closed. | Should |
| US-15 | As an admin, I want to filter and search bookings by date or patient name, so that I can find a booking quickly. | Should |

---

# Acceptance Criteria

## Customer

**US-1: Create an account**
- [ ] Registration requires name, email and password
- [ ] A duplicate email is rejected with a clear error message
- [ ] The password is stored hashed, never as plain text

**US-2: Log in**
- [ ] A valid email and password logs the user in
- [ ] A wrong password shows an error without revealing which field is wrong
- [ ] A logged-out user cannot open "My bookings"

**US-3: View services**
- [ ] Each service shows name, duration and price
- [ ] Only active services are shown

**US-4: View available slots**
- [ ] Slots are shown for the selected service and date
- [ ] Slots outside working hours and already booked slots are not shown
- [ ] Past times are not shown

**US-5: Book a slot**
- [ ] A booking is created for the selected slot and linked to the user
- [ ] Booking a slot that was just taken returns an error and no booking is created
- [ ] Two simultaneous requests for the same slot result in exactly one booking

**US-6: Cancel a booking**
- [ ] The user can cancel only their own bookings
- [ ] After cancelling, the slot becomes available again

**US-7: View my bookings**
- [ ] Upcoming and past bookings are shown separately
- [ ] A user sees only their own bookings

**US-13: Reschedule (Should)**
- [ ] The user can move a booking to another available slot
- [ ] The old slot is released and the new one is reserved in one step

## Admin

**US-8: Admin login**
- [ ] Admin pages are reachable only with the admin role
- [ ] A customer opening an admin page gets "access denied"

**US-9: Manage services**
- [ ] The admin can add, edit and delete a service
- [ ] Name, duration and price are validated (duration and price must be positive)
- [ ] A service with future bookings cannot be deleted

**US-10: Working hours**
- [ ] The admin can set start and end time for each weekday per provider
- [ ] Changes affect the available slots shown to customers

**US-11: View schedule**
- [ ] Today's bookings are shown in time order
- [ ] The admin can see all bookings with customer name, service and time

**US-12: Manual booking**
- [ ] The admin can create a booking for a customer by phone
- [ ] The same double-booking protection applies as for online bookings
- [ ] The admin can cancel any booking

**US-14: Days off (Should)**
- [ ] The admin can block a full day or a time range
- [ ] Blocked times do not appear as available slots

**US-15: Filter and search (Should)**
- [ ] Bookings can be filtered by date
- [ ] Bookings can be searched by patient name
