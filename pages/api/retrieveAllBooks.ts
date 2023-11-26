import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const books = await prisma.book.findMany(); // Retrieve all books from the database

      res.status(200).json({ success: true, books });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch books' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
