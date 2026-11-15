/**
 * Appointment Booking System - database schema (T12)
 *
 * Creates the collections with validation rules and all indexes
 * described in docs/design/er-diagram.md.
 *
 * Usage (MongoDB Shell):
 *   mongosh "mongodb://localhost:27017" --file docs/design/schema.js
 *
 * The script can be run more than once: existing collections are updated
 * and indexes that already exist are left as they are.
 *
 * Note: booking + booking_slots are written in one transaction (FR-10),
 * and MongoDB transactions need a replica set. MongoDB Atlas has this by
 * default. Locally, run MongoDB as a single-node replica set.
 */

db = db.getSiblingDB("appointment_booking");

function ensureCollection(name, schema) {
  const options = {
    validator: { $jsonSchema: schema },
    validationLevel: "strict",
    validationAction: "error",
  };
  if (db.getCollectionNames().includes(name)) {
    db.runCommand(Object.assign({ collMod: name }, options));
  } else {
    db.createCollection(name, options);
  }
}

const HHMM = "^([01][0-9]|2[0-3]):[0-5][0-9]$";

// ---------------------------------------------------------------- users
ensureCollection("users", {
  bsonType: "object",
  required: ["name", "email", "passwordHash", "role", "createdAt"],
  properties: {
    name: { bsonType: "string", minLength: 1 },
    email: { bsonType: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
    passwordHash: { bsonType: "string" },
    role: { enum: ["customer", "admin"] },
    createdAt: { bsonType: "date" },
  },
});

// ------------------------------------------------------------ providers
ensureCollection("providers", {
  bsonType: "object",
  required: ["name", "isActive"],
  properties: {
    name: { bsonType: "string", minLength: 1 },
    isActive: { bsonType: "bool" },
  },
});

// ------------------------------------------------------------- services
// The duration must be a multiple of the slot length (30 minutes by default).
// MongoDB cannot check that against a config value, so the API enforces it.
ensureCollection("services", {
  bsonType: "object",
  required: ["name", "durationMinutes", "price", "isActive"],
  properties: {
    name: { bsonType: "string", minLength: 1 },
    durationMinutes: { bsonType: "int", minimum: 1 },
    price: { bsonType: "number", minimum: 0 },
    isActive: { bsonType: "bool" },
  },
});

// -------------------------------------------------------- working_hours
ensureCollection("working_hours", {
  bsonType: "object",
  required: ["providerId", "weekday", "startTime", "endTime"],
  properties: {
    providerId: { bsonType: "objectId" },
    weekday: { bsonType: "int", minimum: 0, maximum: 6 }, // 0 = Sunday
    startTime: { bsonType: "string", pattern: HHMM },
    endTime: { bsonType: "string", pattern: HHMM },
  },
});

// ------------------------------------------------------------- time_off
ensureCollection("time_off", {
  bsonType: "object",
  required: ["providerId", "startAt", "endAt"],
  properties: {
    providerId: { bsonType: "objectId" },
    startAt: { bsonType: "date" },
    endAt: { bsonType: "date" },
    reason: { bsonType: "string" },
  },
});

// ------------------------------------------------------------- bookings
// A booking needs either a user account (online) or a customer name
// (manual booking by the admin for a patient who called by phone).
ensureCollection("bookings", {
  bsonType: "object",
  required: [
    "providerId",
    "serviceId",
    "startAt",
    "endAt",
    "status",
    "createdBy",
    "createdAt",
  ],
  anyOf: [{ required: ["userId"] }, { required: ["customerName"] }],
  properties: {
    userId: { bsonType: "objectId" },
    customerName: { bsonType: "string", minLength: 1 },
    customerPhone: { bsonType: "string" },
    providerId: { bsonType: "objectId" },
    serviceId: { bsonType: "objectId" },
    startAt: { bsonType: "date" },
    endAt: { bsonType: "date" },
    status: { enum: ["confirmed", "cancelled"] },
    createdBy: { bsonType: "objectId" },
    createdAt: { bsonType: "date" },
  },
});

// -------------------------------------------------------- booking_slots
ensureCollection("booking_slots", {
  bsonType: "object",
  required: ["bookingId", "providerId", "slotStart"],
  properties: {
    bookingId: { bsonType: "objectId" },
    providerId: { bsonType: "objectId" },
    slotStart: { bsonType: "date" },
  },
});

// -------------------------------------------------------------- indexes
db.users.createIndex({ email: 1 }, { unique: true }); // FR-1: no duplicate accounts

// FR-10 / NFR-7: the database itself refuses a second booking for the same slot
db.booking_slots.createIndex(
  { providerId: 1, slotStart: 1 },
  { unique: true }
);

db.bookings.createIndex({ userId: 1, startAt: 1 }); // FR-13: my bookings
db.bookings.createIndex({ startAt: 1 }); // FR-14, FR-16: admin schedule and search
db.working_hours.createIndex({ providerId: 1, weekday: 1 }); // FR-8: slot calculation
db.time_off.createIndex({ providerId: 1, startAt: 1 }); // FR-7, FR-8: days off

print("Schema is ready in database: " + db.getName());
