import { Schema, model } from "mongoose";

const ShopsSchema = new Schema({
  
  isActive: {
    type: Boolean,
    default: true
  },
}, {  timestamps: true });

export const Shops = model("Shops", ShopsSchema);