import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { bookId } = req.query;

    try {
      const deletedBook = await prisma.book.delete({
        where: { id: Number(bookId) },
      });

      res.status(200).json({ success: true, data: deletedBook });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to delete the book' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
