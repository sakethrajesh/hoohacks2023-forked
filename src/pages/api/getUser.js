import connectToDB from '../../database/connect';
import { User, Book, Page } from '../../models/models';

const getUserHandler = async (req, res) => {
  await connectToDB();

  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users.' });
  }
};

export default getUserHandler;
