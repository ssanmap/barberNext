import type { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '../../../src/services/userService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const data = req.body;
    try {
      const user = await updateUser(id as string, data);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
