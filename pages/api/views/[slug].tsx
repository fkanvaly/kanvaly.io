import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const slug = req.query.slug.toString();

    if (req.method === 'POST') {
        return res.status(200).json({
        total: "2"
        });
    }

    if (req.method === 'GET') {
        return res.status(200).json({ total: ""});
    }
}