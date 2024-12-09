import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      email,
      password,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || 'Login failed.',
    });
  }
}
