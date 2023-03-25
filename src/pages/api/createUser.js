import connectToDB from "../../database/connect";
import { User } from "../../models/models";
import axios from "axios";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectToDB();

  try {
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    const newUser = await User.create({
      name: username,
      email: email,
      password: password,
      books: undefined,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error); // Log the error on the server-side
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
