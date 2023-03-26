import connectToDB from "../../database/connect";
import { User, Book } from "../../models/models";

const deleteBookHandler = async (req, res) => {
  if (req.method === "DELETE") {
    const { bookId, userId } = req.body;

    try {
      await connectToDB();

      const deletedBook = await Book.findByIdAndDelete(bookId);

      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      const updatedUser = await User.findOneAndUpdate(
        { email: userId },
        { $pull: { books: bookId } },
        { new: true }
      );

      if (!updatedUser) {
        console.log("User not found");
        return;
      }

      console.log("Updated user:", updatedUser);

      res
        .status(200)
        .json({ message: "Book deleted successfully", data: deletedBook });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default deleteBookHandler;
