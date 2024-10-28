import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../src/infrastructure/database';
import Professional from '../../../../src/domain/models/Professional';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await Professional.findByIdAndDelete(id);
      res.status(200).json({ message: 'Professional deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting professional' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
