import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  clientId: string;
  serviceId: string;
  professionalId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'completed';
}

const AppointmentSchema: Schema = new Schema({
  clientId: { type: String, ref: 'User', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  professionalId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true, enum: ['pending', 'confirmed', 'completed'] },
});

// Evitar recompilar el modelo
export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
