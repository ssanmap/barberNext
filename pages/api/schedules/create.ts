import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../src/infrastructure/database';
import Schedule from '../../../src/domain/models/Schedule';
import { DateTime } from 'luxon';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const { professionalId, dayOfWeek, startTime, endTime } = req.body;

      // Log para revisar los datos que llegan en la solicitud
      const startDateTime = DateTime.fromFormat(startTime, 'HH:mm', { zone: 'local' }).toJSDate();
      const endDateTime = DateTime.fromFormat(endTime, 'HH:mm', { zone: 'local' }).toJSDate();

      // Log para verificar que las fechas se hayan convertido correctamente
      console.log("startDateTime:", startDateTime);
      console.log("endDateTime:", endDateTime);
      

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
