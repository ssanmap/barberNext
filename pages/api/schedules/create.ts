import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../src/infrastructure/database';
import Schedule from '../../../src/domain/models/Schedule';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const { professionalId, dayOfWeek, startTime, endTime } = req.body;

      // Log para revisar los datos que llegan en la solicitud
      console.log("Datos recibidos:", { professionalId, dayOfWeek, startTime, endTime });

      const newSchedule = new Schedule({ professionalId, dayOfWeek, startTime, endTime });
      const savedSchedule = await newSchedule.save();

      // Log para confirmar el horario guardado en la base de datos
      console.log("Horario creado:", savedSchedule);

      res.status(201).json(savedSchedule);
    } catch (error) {
      console.error("Error creando horario:", error); // Log del error
      res.status(500).json({ message: 'Error creando horario', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
