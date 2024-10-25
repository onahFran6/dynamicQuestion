import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  email: string;
  password: string;
  region: string;
  assignedQuestion?: Schema.Types.ObjectId;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  region: { type: String, required: true },
  assignedQuestion: { type: Schema.Types.ObjectId, ref: 'Question' },
});

// Password hashing before saving user.
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method.
UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = model<IUser>('User', UserSchema);
