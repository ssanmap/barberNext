import Appointment, { IAppointment } from '../domain/models/Appointment';

export const createAppointment = async (appointmentData: IAppointment) => {
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
