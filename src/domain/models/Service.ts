import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  duration: number; // Duración en minutos
  price: number;
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
export default Service;