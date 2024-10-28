import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../src/infrastructure/database';
import Appointment from '../../../../src/domain/models/Appointment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ message: 'Error actualizando la cita' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
