import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/user.js";
import { RequestHandler } from "express";

/* registration */
const registration: RequestHandler = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.send({ Error: "Account already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hashPassword,
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

/* login */
const login: RequestHandler = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ Error: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).end();
    });
  })(req, res, next);
};

/* logout */
const logout: RequestHandler = (req, res) => {
  req.logout(() => {
    res.status(200).end();
  });
};

export { registration, login, logout };
