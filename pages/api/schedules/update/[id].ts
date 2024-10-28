import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../src/infrastructure/database';
import Schedule from '../../../../src/domain/models/Schedule';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'PUT') {
    const { id } = req.query;
    try {
      const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedSchedule);
    } catch (error) {
      res.status(500).json({ message: 'Error actualizando horario' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
