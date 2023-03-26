import connectToDB from "../../database/connect";
import { Book } from "../../models/models";

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectToDB();

  try {
    console.log("in here")
    const { bookId } = req.body;
    const book = await Book.findById(bookId);

    if (book) {
      res.status(200).json({ message: 'Book found', book });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};