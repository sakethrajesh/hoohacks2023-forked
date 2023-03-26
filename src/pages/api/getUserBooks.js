import connectToDB from "../../database/connect";
import { Book, User } from "../../models/models";

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectToDB();

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const books = await Book.find({ _id: { $in: user.books } });

    res.status(200).json({ message: 'Books found', books });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};