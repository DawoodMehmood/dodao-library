import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const bookId = Number(req.query.id);
      const { bookName, authorName, ISBN, price, availability } = req.body;

      const updatedBook = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          bookName,
          authorName,
          ISBN,
          price,
          availability
        },
      });

      res.status(200).json({ success: true, data: updatedBook });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to update book' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
