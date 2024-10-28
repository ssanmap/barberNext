import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../src/infrastructure/database';
import Service from '../../../../src/domain/models/Service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'PUT') {
    const { id } = req.query;
    const { name, duration, price } = req.body;
    const service = await Service.findByIdAndUpdate(id, { name, duration, price }, { new: true });
    res.status(200).json(service);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
