import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../src/infrastructure/database';
import Service from '../../../../src/domain/models/Service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await Service.findByIdAndDelete(id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
