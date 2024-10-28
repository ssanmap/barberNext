import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../src/infrastructure/database';
import Appointment from '../../../src/domain/models/Appointment';
import Schedule from '../../../src/domain/models/Schedule';
import Service from '../../../src/domain/models/Service';
import { DateTime } from 'luxon';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const { professionalId, date } = req.query;

    try {
      const dayOfWeek = new Date(date as string).getDay();
      const schedules = await Schedule.find({ professionalId, dayOfWeek });
      const appointments = await Appointment.find({ professionalId });

      const occupiedTimes = appointments.map(appointment => 
        DateTime.fromISO(appointment.date.toISOString()).setZone('local').toFormat('HH:mm')
      );

      const availableTimes: string[] = [];

      for (const schedule of schedules) {
        const startHour = parseInt(schedule.startTime.split(':')[0], 10);
        const endHour = parseInt(schedule.endTime.split(':')[0], 10);

        for (let hour = startHour; hour <= endHour; hour++) {
          for (let minute = 0; minute < 60; minute += 60) {
            const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            if (occupiedTimes.includes(timeString)) continue;

            // Obtener la duración del servicio
            const service = await Service.findById(appointments[0]?.serviceId);
            const duration = service ? service.duration : 0; // en minutos

            const nextHour = hour + Math.floor(duration / 60);
            const nextMinute = minute + (duration % 60);

            const endTimeString = `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')}`;

            // Verifica que el tiempo de fin no esté ocupado
            if (!occupiedTimes.includes(endTimeString)) {
              availableTimes.push(timeString);
            }
          }
        }
        console.log("Available Times:", availableTimes); // Log para verificar
        console.log("Occupied Times:", occupiedTimes); // Log para verificar
      }

      res.status(200).json(availableTimes);
    } catch (error) {
      console.error("Error fetching available times:", error);
      res.status(500).json({ message: 'Error al obtener horarios disponibles' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
