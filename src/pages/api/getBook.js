import connectToDB from '../../database/connect';
import { User, Book, Page } from '../../models/models';

const getBookHandler = async (req, res) => {
  await connectToDB();

  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users.' });
  }
};

export default getBookHandler;
