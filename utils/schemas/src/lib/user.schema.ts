import { userRoles } from '@/utils/common/src';
import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  companyName: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organizationId:{type: String},
  role:{type:Number , default:userRoles.organization ,required:true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface User extends Document {
  firstName: string;
  lastName: string;
  companyName: string;
  contactNumber: string;
  organizationId:string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
