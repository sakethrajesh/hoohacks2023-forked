import connectToDB from '../../database/connect';
import { User, Book, Page } from '../../models/models';

const getPageHandler = async (req, res) => {
  await connectToDB();

  try {
    const pages = await Page.find({});
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users.' });
  }
};

export default getPageHandler;
