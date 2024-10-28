import type { NextApiRequest, NextApiResponse } from 'next';
import Professional from '../../../src/domain/models/Professional';
import connectDB from '../../../src/infrastructure/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  if (req.method === 'POST') {
    try {
      const professional = new Professional(req.body);
      await professional.save();
      res.status(200).json(professional);
    } catch (error) {
      res.status(500).json({ message: 'Error creating professional' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
