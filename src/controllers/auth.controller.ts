import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.service";
import AppError from "../utils/appError";
import fa from "zod/v4/locales/fa.cjs";
import en from "zod/v4/locales/en.cjs";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    if (!name.trim()) {
      return res.status(400).json({
        success: false,
        message: {
          en: "Name is required.",
          ar: "الاسم مطلوب.",
        },
      });
    }

    if (!email.trim()) {
      return res.status(400).json({
        success: false,
        message: {
          en: "Email is required.",
          ar: "البريد الالكتروني مطلوب.",
        },
      });
    }

    if (name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: {
          en: "Name must be at least 3 characters.",
          ar: "الاسم يجب ان يكون على الاقل 3 حروف.",
        },
      });
    }

    const emailRgex = /\S+@\S+\.\S+/;

    if (!emailRgex.test(email)) {
      throw new AppError(
        "Invalid email format.",
        "البريد الالكتروني غير صحيح",
        400
      );
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: {
          en: "Password must be at least 6 characters.",
          ar: "كلمة المرور يجب ان تكون على الاقل 6 حروف.",
        },
      });
    }

    const { user, accessToken, refreshToken } = await AuthService.signUp(
      name,
      email,
      password
    );

    // Set Cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: {
        en: "User created successfully.",
        ar: "تم انشاء المستخدم بنجاح.",
      },
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    if (!email.trim()) {
      return res.status(400).json({
        success: false,
        message: {
          en: "Email is required.",
          ar: "البريد الالكتروني مطلوب.",
        },
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: {
          en: "Password must be at least 6 characters.",
          ar: "كلمة المرور يجب ان تكون على الاقل 6 حروف.",
        },
      });
    }

    const { user, accessToken, refreshToken } = await AuthService.signIn(
      email,
      password
    );
    // Set Cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(200).json({
      success: true,
      message: {
        en: "User logged in successfully.",
        ar: "تم تسجيل الدخول بنجاح.",
      },
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn };
