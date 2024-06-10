import { Schema, Document } from 'mongoose';

export const InviteSchema = new Schema({
  email: { type: String, required: true, unique: true },
  organizationId: { type: String },
  token: { type: String, required: true },
});

export interface Invite extends Document {
  email: string;
  organizationId:string;
  token:string;
}
