import AppError from "../utils/appError";
import User from "../models/user.model";
import generateTokens from "../utils/generateToken";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

const signUp = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists", "المستخدم موجود بالفعل", 400);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashPassword });

  const { refreshToken, accessToken } = await generateTokens(newUser);
  const userObj = newUser.toObject();
  const safeUser = { ...userObj, password: undefined };
  return { user: safeUser, accessToken, refreshToken };
};

const signIn = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new AppError("User not found", "المستخدم غير موجود", 404);
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    throw new AppError(
      "Password or Email is incorrect",
      "كلمة المرور او البريد الالكتروني غير صحيح",
      400
    );
  }

  const { refreshToken, accessToken } = await generateTokens(existingUser);
  const userObj = existingUser.toObject();
  const safeUser = { ...userObj, password: undefined };
  return { user: safeUser, accessToken, refreshToken };
};

const refreshToken = async (
  token: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as {
      user: {
        id: string;
        email: string;
      };
      type: string;
    };

    if (decoded.type !== "refresh") {
      throw new AppError("Invalid token type", "نوع الرمز غير صحيح", 401);
    }

    const user = await User.findById(decoded.user.id );
    if (!user) {
      throw new AppError("User not found or inactive", "المستخدم غير موجود او غير نشط" , 401);
    }

    return generateTokens(user);
  } catch (error) {
    throw new AppError("Invalid refresh token", "رمز تحديث غير صحيح" , 401);
  }
};
export { signUp, signIn, refreshToken };
