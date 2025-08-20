import Feedback from "../models/feedback.model.js";

export const addNewFeedback = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newFeedback = new Feedback({
      name,
      email,
      message,
    });
    await newFeedback.save();
    return res
      .status(200)
      .json({ message: "feedback added successfully", newFeedback });
  } catch (err) {
    console.error("Error in adding feedback:", err);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const getAllFeedback = async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Only admin can access this." });
  }
  try {
    const feedback = await Feedback.find();
    return res
      .status(200)
      .json({ message: "feedback fetched successfully", feedback });
  } catch (err) {
    console.error("Error in fetching feedback:", err);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const deleteFeedback = async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Only admin can access this." });
  }
  const { id } = req.params;
  try {
    const feedback = await Feedback.findByIdAndDelete({ _id: id });
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    return res
      .status(200)
      .json({ message: "Feedback deleted successfully", feedback });
  } catch (err) {
    console.error("Error in deleting feedback:", err);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
