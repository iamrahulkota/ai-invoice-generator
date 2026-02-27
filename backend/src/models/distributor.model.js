import { Schema, model } from "mongoose";

// ── Embedded address sub-schema ─────────────────────────
const AddressSchema = new Schema(
  {
    state:         { type: String, trim: true, default: null },
    district:      { type: String, trim: true, default: null },
    building_name: { type: String, trim: true, default: null },
    house_no:      { type: String, trim: true, default: null },
    pin_code:      { type: String, trim: true, default: null },
  },
  { _id: false }
);

// ── Business Profile (embedded inside Distributor) ──────
const BusinessProfileSchema = new Schema(
  {
    business_name:     { type: String, trim: true, default: null },
    owner_name:        { type: String, trim: true, default: null },
    business_email:    { type: String, trim: true, lowercase: true, default: null },
    contact_number:    { type: String, trim: true, default: null },
    business_logo_url: { type: String, default: null },
    gstin:             { type: String, trim: true, uppercase: true, default: null },
    pan_number:        { type: String, trim: true, uppercase: true, default: null },
    invoice_prefix:    { type: String, trim: true, default: "INV-" },
    invoice_counter:   { type: Number, default: 0 },
    address:           { type: AddressSchema, default: () => ({}) },
  },
  { _id: false }
);

// ── Distributor (main user) schema ──────────────────────
const DistributorSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String, 
      default: null
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    last_login: {
      type: Date,
      default: null,
    },
    // ← All business profile data lives here (pre-filled on profile page)
    business_profile: {
      type: BusinessProfileSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

export const Distributor = model("Distributor", DistributorSchema);