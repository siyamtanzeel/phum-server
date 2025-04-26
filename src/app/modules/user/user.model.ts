import bcrypt from 'bcrypt';
import { TUser } from './user.interface';
import { model, Schema, Types } from 'mongoose';
import config from '../../config';

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

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    config.bcrypt_salt as string,
  );
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});
export const User = model<TUser>('User', userSchema);
