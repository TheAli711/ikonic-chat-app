import { User } from "../models/index";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    }
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    }
    const { password, ...data } = user.toJSON();
    const token = createJWT(data);
    res.json({
      message: "Login successful",
      data,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

const signup = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  console.log(req.body);
  try {
    const existingUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already in use",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const pswd = bcrypt.hashSync(req.body.password, salt);
    const payload = {
      username: req.body.username,
      password: pswd,
    };
    const user = await User.create(payload);
    const { password, ...data } = user.toJSON();
    const token = createJWT(data);
    res.json({
      message: "Signup successful",
      token,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const { password, ...data } = user ? user.toJSON() : {};
    res.json({
      message: "Profile fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

const createJWT = (user) => {
  return jwt.sign(user, import.meta.env.JWT_SECRET, {
    expiresIn: import.meta.env.JWT_EXPIRES,
  });
};

export { login, signup, getProfile };
