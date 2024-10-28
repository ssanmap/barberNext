import type { NextApiRequest, NextApiResponse } from 'next';
import { createAppointment } from '../../../src/app/createAppointment';
import connectDB from '../../../src/infrastructure/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    console.log("Request Body:", req.body); // Log para verificar los datos de la solicitud
    try {
      const appointment = await createAppointment(req.body);
      res.status(200).json(appointment);
    } catch (error) {
      console.error("Error al crear la cita:", error); // Log del error
      res.status(500).json({ message: 'Error creating appointment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
