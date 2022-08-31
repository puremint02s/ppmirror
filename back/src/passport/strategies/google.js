const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { User, OAuth } from "../../models";

const config = {
  clientID:
    "791919222327-ooc6i1p0goo36si3i5rv88ku5nm3lkbq.apps.googleusercontent.com", // clientId 설정하기
  clientSecret: "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", // clientSecret 설정하기
  callbackURL: "/auth/google/callback",
};

async function findOrCreateUser({ name, email }) {
  const user = await User.findOne({
    email,
  });

  if (user) {
    return user;
  }

  const created = await User.create({
    name,
    email,
    password: "GOOGLE_OAUTH",
  });

  return created;
}

module.exports = new GoogleStrategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json;

    try {
      const user = await findOrCreateUser({ email, name });
      done(null, {
        shortId: user.shortId,
        email: user.email,
        name: user.name,
      });
    } catch (e) {
      done(e, null);
    }
  }
);
