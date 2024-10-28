import type { NextApiRequest, NextApiResponse } from 'next';
import Appointment from '../../../src/domain/models/Appointment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const appointments = await Appointment.find();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'error.message' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
