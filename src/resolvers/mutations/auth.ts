import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import validator from "validator";

import { HASH_SALT, JWT_SECRET } from "src/utils/secrets";
import withResolverProps from "src/utils/with-resolver-props";

import type { User } from "@prisma/client";

type SigninCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = {
  name: string;
  email: string;
  password: string;
  profileBio: string;
};

type SigninPayload =
  | {
      email: string;
      token: string;
      message: "VALID_CREDENTIALS";
    }
  | { message: "INVALID_CREDENTIALS"; email?: null; token?: null };

type SignupPayload = {
  message: "SUCCESS" | "INVALID_CREDENTIALS";
};

type SigninArgs = { args: { credentials: SigninCredentials } };
type SignupArgs = { args: { credentials: SignupCredentials } };

export default {
  userSignin: withResolverProps<SigninArgs, Promise<SigninPayload>>(
    async ({ context: { prismaClient }, args: { credentials } }) => {
      const { email, password } = credentials;
      const isValidEmail = validator.isEmail(email);
      const isValidPassword = validator.isLength(password, {
        min: 5,
      });
      let isCorrectPassword: Boolean;
      let user: User | null;
      let token: string;

      if (!isValidEmail || !isValidPassword)
        return {
          message: "INVALID_CREDENTIALS",
        };

      user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      if (!user)
        return {
          message: "INVALID_CREDENTIALS",
        };

      isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword)
        return {
          message: "INVALID_CREDENTIALS",
        };

      token = Jwt.sign(
        {
          userId: user.id,
        },
        JWT_SECRET,
        {
          expiresIn: "8h",
        }
      );

      //   res.cookie("AUTH_TOKEN", token, { httpOnly: true, secure: true }); for later

      return {
        message: "VALID_CREDENTIALS",
        email: email,
        token,
      };
    }
  ),
  userSignup: withResolverProps<SignupArgs, Promise<SignupPayload>>(
    async ({ context: { prismaClient }, args: { credentials } }) => {
      const { name, email, password, profileBio } = credentials;
      const isValidPassword = validator.isLength(password, { min: 5 });
      const isValidEmail = validator.isEmail(email);
      const hasBio = validator.isLength(profileBio, { min: 1 });
      const hasName = validator.isLength(name, { min: 3 });

      if (!isValidEmail || !isValidPassword || !hasBio || !hasName)
        return { message: "INVALID_CREDENTIALS" };

      const hashedPass = await bcrypt.hash(password, HASH_SALT);
      await prismaClient.user.create({
        data: { name, email, password: hashedPass, profile: { create: { bio: profileBio } } },
      });

      return { message: "SUCCESS" };
    }
  ),
};
