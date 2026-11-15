# Software Requirements Specification (SRS)

**Project:** Appointment Booking System
**Version:** 1.0
**Date:** 2026-11-16
**Author:** [Mohammad Abu Jumaa]
**Status:** Draft for review

---

## 1. Introduction

### 1.1 Purpose
This document describes what the Appointment Booking System must do. It is the reference for the design, implementation and testing phases.

### 1.2 Problem
Small clinics usually manage appointments by phone or WhatsApp. This causes double bookings, forgotten appointments and wasted staff time.

### 1.3 Product summary
A web application where patients browse available time slots and book or cancel online, and clinic staff manage services, working hours and bookings from a dashboard. The system guarantees that two bookings can never exist for the same slot.

### 1.4 Goals
- A patient completes a booking in under 2 minutes.
- Zero double bookings, even under simultaneous requests.
- The admin sees today's schedule at a glance.

### 1.5 Non-goals
- Not a medical records system (EMR).
- Not a multi-clinic platform in v1.
- Not a replacement for accounting software.

---

## 2. Users

| Role | Description |
|------|-------------|
| Customer | A patient who wants to book quickly, mostly from a phone. |
| Admin | Clinic staff who manage the schedule, services and manual bookings. |
| Provider | The doctor. In v1 only a resource with a schedule, with no interface of their own. |

---

## 3. Scope (v1)

**In scope (Must):** registration and login, roles, services, working hours, available slots, booking with double-booking prevention, cancelling, admin dashboard, manual bookings.

**In scope if time allows (Should):** rescheduling, days off, filtering and searching bookings.

**Out of scope:** online payments, native mobile app, multiple clinics, multiple languages, Google Calendar integration. Email/SMS reminders, guest booking and a calendar view are candidates for v2.

---

## 4. Requirements

Full details live in the files below. This section summarizes them.

| Document | Content | Count |
|----------|---------|-------|
| [user-stories.md](user-stories.md) | User stories with acceptance criteria | 15 stories (12 Must, 3 Should) |
| [requirements.md](requirements.md) | Functional and non-functional requirements with MoSCoW priorities | 16 FR and 13 NFR |

### 4.1 Functional requirements (summary)
- **Accounts:** register, log in and out, two roles (FR-1 to FR-3).
- **Catalog:** view and manage services (FR-4, FR-5).
- **Availability:** working hours, days off and calculated slots (FR-6 to FR-8).
- **Booking:** book, prevent double booking, cancel, reschedule, view my bookings (FR-9 to FR-13).
- **Administration:** schedule view, manual booking, filter and search (FR-14 to FR-16).

### 4.2 Non-functional requirements (summary)
- **Performance:** slots in under 2 seconds, booking in under 1 second.
- **Security:** hashed passwords, role-based access, own-data access only, server-side validation.
- **Reliability and data:** no double booking (automated test), UTC storage.
- **Usability and compatibility:** responsive on mobile, latest browsers.
- **Maintainability and deployment:** automated tests for main flows, public URL with README.

### 4.3 Priorities
- Functional: 13 Must, 3 Should.
- Non-functional: 8 Must, 5 Should.
- If the schedule slips, Should items are cut first.

---

## 5. Constraints and assumptions

- One clinic and one time zone. Times are stored in UTC and shown in the clinic's time zone.
- An appointment occupies a full slot based on the service duration, with no overlap.
