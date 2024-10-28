import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../src/infrastructure/database';
import Schedule from '../../../../src/domain/models/Schedule';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const { professionalId } = req.query;
    try {
      const schedules = await Schedule.find({ professionalId });
      res.status(200).json(schedules);
    } catch (error) {
      res.status(500).json({ message: 'Error obteniendo horarios' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
