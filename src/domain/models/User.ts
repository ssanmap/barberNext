import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'admin' | 'peluquero' | 'barbero' | 'manicurista';
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'peluquero', 'barbero', 'manicurista'] },
});

export default mongoose.model<IUser>('User', UserSchema);
