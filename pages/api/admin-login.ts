import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_EMAIL = 'manthantiwari@zohomail.in'; // hardcoded for now, can be env

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  // Set a secure cookie
  res.setHeader('Set-Cookie', serialize('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/manthanadmin',
    sameSite: 'lax',
  }));
  return res.status(200).json({ message: 'Authenticated', email: ADMIN_EMAIL });
}
