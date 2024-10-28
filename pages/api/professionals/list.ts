import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../src/infrastructure/database';
import Professional from '../../../src/domain/models/Professional';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const professionals = await Professional.find({});
      res.status(200).json(professionals);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching professionals' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
