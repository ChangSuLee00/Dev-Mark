import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password!);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "password do not match" });
            }
          } else {
            done(null, false, { message: "user is not registered" });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
