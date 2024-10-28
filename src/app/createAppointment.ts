import Appointment, { IAppointment } from '../domain/models/Appointment';
import { DateTime } from 'luxon';

export const createAppointment = async (appointmentData: IAppointment) => {

  const date = typeof appointmentData.date === 'string'
  ? DateTime.fromISO(appointmentData.date, { zone: 'local' }).toJSDate()
  : appointmentData.date;
  console.log('date' , date)

  // Asegúrate de que 'date' es una cadena
  const dateInUTC = DateTime.fromISO(String(appointmentData.date), { zone: 'local' }).setZone('UTC').toJSDate();

  console.log('date in utc', dateInUTC);
   const appointment2 = { ...appointmentData, date: dateInUTC };
   console.log('appointment2:', appointment2);
  const appointment = new Appointment(appointmentData);
  console.log('Saving appointment:', appointment);
  try {
    const savedAppointment = await appointment.save();
    console.log('Appointment saved successfully:', savedAppointment);
    return savedAppointment;
  } catch (error) {
    console.error('Error saving appointment:', error);
    throw error;
  }
};
