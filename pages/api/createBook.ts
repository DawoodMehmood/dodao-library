import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { bookName, authorName, ISBN, price, availability} = req.body;
      const newBook = await prisma.book.create({
        data: {
          bookName,
          authorName,
          ISBN,
          price,
          availability,
        },
      });

      res.status(201).json(req.body);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to create a new book' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
