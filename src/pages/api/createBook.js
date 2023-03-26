import connectToDB from "../../database/connect";
import { Book, User } from "../../models/models";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectToDB();

  try {
    console.log(req.body);
    const newBook = await Book.create(req.body["date"]);
    // console.log(newBook._id.toString())

    const user = await User.findOneAndUpdate(
      { email: req.body["name"] },
      { $push: { books: newBook._id.toString() } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "User created successfully", book: newBook });
  } catch (error) {
    console.error("Error creating user:", error); // Log the error on the server-side
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
