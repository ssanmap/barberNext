import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserById } from '../../../src/services/userService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const user = await getUserById(id as string);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
}
