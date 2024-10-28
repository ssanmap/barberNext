import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../src/infrastructure/database';
import Appointment from '../../../../src/domain/models/Appointment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Appointment.findByIdAndDelete(id);
      res.status(200).json({ message: 'Cita eliminada' });
    } catch (error) {
      res.status(500).json({ message: 'Error eliminando la cita' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
