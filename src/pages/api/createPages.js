import connectToDB from "../../database/connect";
import { Page } from "../../models/models";

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectToDB();

  try {
    const { pagesData } = req.body;
    const newPages = await Page.insertMany(pagesData);
    res.status(201).json({ message: 'Pages created successfully', pages: newPages });
  } catch (error) {
    res.status(500).json({ message: 'Error creating pages', error: error.message });
  }
};