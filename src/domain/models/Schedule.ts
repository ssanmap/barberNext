import mongoose, { Schema, Document } from 'mongoose';

interface ISchedule extends Document {
  professionalId: mongoose.Types.ObjectId;
  dayOfWeek: number; // 0 (Domingo) - 6 (Sábado)
  startTime: string; // Ejemplo: "09:00"
  endTime: string;   // Ejemplo: "18:00"
  isAvailable: boolean;
}

const ScheduleSchema = new Schema<ISchedule>({
  professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional', required: true },
  dayOfWeek: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

const Schedule = mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', ScheduleSchema);
export default Schedule;
