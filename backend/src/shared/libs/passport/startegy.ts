import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  ExtractJwt,
  StrategyOptions,
  Strategy as JwtStrategy,
} from "passport-jwt";

import { ACCESS_TOKEN_SECRET } from "@/shared/common/config";
import { randomUUID } from "crypto";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req: any) => {
      return req.cookies?.access_token;
    },
  ]),
  secretOrKey: ACCESS_TOKEN_SECRET,
};

passport.use(
  "jwt",
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = { id: randomUUID() };

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        if (!email) {
          done(null, false);
        }

        const user = {
          id: randomUUID(),
          Email: "test@gmail.com",
        };

        if (user.Email == email) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  if (!user.id) {
    return done(new Error("Invalid user object"));
  }

  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = { id: randomUUID() };

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
