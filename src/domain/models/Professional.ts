import mongoose, { Schema, Document, models } from 'mongoose';

export interface IProfessional extends Document {
  name: string;
  specialty: string;
}

const ProfessionalSchema: Schema = new Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
});

export default models.Professional || mongoose.model<IProfessional>('Professional', ProfessionalSchema);
