const User = require("../models/User");

/**
 * @desc   Register new user
 * @route  POST /api/auth/signup
 */
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, userType } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      userType,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to register user",
    });
  }
};

/**
 * @desc   Login user
 * @route  POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
};
