import connectToDB from "../../database/connect";
import { Book } from "../../models/models";

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectToDB();

  try {
    const books = await Book.find().limit(9);

    res.status(200).json({ message: 'Books found', books });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};
