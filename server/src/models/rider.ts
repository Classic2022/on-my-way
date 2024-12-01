import mongoose, { Schema, Document, model } from 'mongoose';

// Define an interface for the Rider
export interface IRider extends Document {
  name: string;
  email: string;
  pickup: string;
  dropOff: string;
  status?: string; // New field to track status
}

// Create the Mongoose schema for Rider
const RiderSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pickup: { type: String, required: true },
  dropOff: { type: String, required: true },
  status: { type: String, default: "pending" }, // Default status is "pending"
});

// Create the Mongoose model for Rider
const Rider = model<IRider>('Rider', RiderSchema);

export default Rider;
