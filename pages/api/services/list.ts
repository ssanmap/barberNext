import type { NextApiRequest, NextApiResponse } from 'next';
import Service from '../../../src/domain/models/Service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: 'error.message' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
