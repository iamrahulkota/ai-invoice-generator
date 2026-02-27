import { Schema, model } from "mongoose";

const AddressSchema = new Schema(
  {
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "District is required"],
      trim: true,
    },
    building_name: {
      type: String,
      required: [true, "Building / Block name is required"],
      trim: true,
    },
    house_no: {
      type: String,
      required: [true, "House / Flat number is required"],
      trim: true,
    },
    pin_code: {
      type: String,
      required: [true, "PIN code is required"],
      match: [/^\d{6}$/, "PIN code must be exactly 6 digits"],
      trim: true,
    },
  },
  { _id: false } // embedded sub-doc, no separate _id needed
);

const ShopsSchema = new Schema(
  {
    distributor_id: {
      type: Schema.Types.ObjectId,
      ref: "distributors",
      required: [true, "Distributor reference is required"],
      index: true,
    },
    shop_name: {
      type: String,
      required: [true, "Shop name is required"],
      trim: true,
      maxlength: [100, "Shop name must be under 100 characters"],
    },
    shop_owner_name: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      maxlength: [100, "Owner name must be under 100 characters"],
    },
    shop_email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address"],
      default: null,
    },
    shop_logo_url: {
      type: String,
      trim: true,
      default: null,
    },
    contact_number: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"],
      trim: true,
    },
    gstin: {
      type: String,
      trim: true,
      uppercase: true,
      match: [
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        "Enter a valid GSTIN",
      ],
      default: null,
    },
    address: {
      type: AddressSchema,
      required: [true, "Address is required"],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes must be under 500 characters"],
      default: null,
    },
    // Denormalized counters — updated via atomic $inc on invoice create/cancel
    total_invoices: {
      type: Number,
      default: 0,
      min: 0,
    },
    outstanding_amount: {
      type: Number,
      default: 0,
      min: 0,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ── Indexes ────────────────────────────────────────────────
// List all shops for a distributor (most common query)
ShopsSchema.index({ distributor_id: 1, createdAt: -1 });

// Filter active shops only
ShopsSchema.index({ distributor_id: 1, is_active: 1 });

// Full-text search on shop name
ShopsSchema.index({ shop_name: "text" });

export const Shops = model("Shops", ShopsSchema);