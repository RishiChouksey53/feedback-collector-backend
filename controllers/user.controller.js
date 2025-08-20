import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ message: "Username is already taken." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists." });
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    console.error("Registration error:", err);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      message: "You have logged in successfully.",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const userProfile = async (req, res) => {
  return res
    .status(200)
    .json({ message: "Profile fetched successfully!", profile: req.user });
};
