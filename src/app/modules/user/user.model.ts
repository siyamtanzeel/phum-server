import { string } from 'zod';
import { TUser } from './user.interface';
import { model, Schema, Types } from 'mongoose';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: [true, 'ID is required!'] },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
    isDeleted: { type: Boolean, default: false },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
