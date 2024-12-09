import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      name,
      email,
      password,
    });

    res.status(201).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: error.response?.data?.error || 'Registration failed' });
  }
}
