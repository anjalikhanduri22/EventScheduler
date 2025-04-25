const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user"); // Import the user schema
const { validateSignUpData } = require("../utils/validation");
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    // Validation of data

    validateSignUpData(req);

    const { name, email, password } = req.body;

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided data
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "User", //Explicitly set the role to "User"
    });

    const savedUser = await newUser.save(); // Save the user to the database

    res
      .status(201)
      .json({ message: "User registered successfully", data: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user not found");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role, // Return the user's role (Admin/User)
        },
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

module.exports = authRouter;
