import type { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '../../../src/services/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const user = await registerUser(email, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
