import { Request, Response, NextFunction } from "express";
import * as UsersService from "../services/users.service";
import AppError from "../utils/appError";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UsersService.getAllUsers();

    res.status(200).json({
      success: true,
      message: {
        en: "Users fetched successfully",
        ar: "تم تحميل المستخدمين بنجاح",
      },
      users,
    });

  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    if(!userId) {
        throw new AppError("Invalid user id", "معرف المستخدم غير صحيح", 400);
    }

    try {
        const user = await UsersService.getOneUser(userId);

        res.status(200)
        .json({
            success: true,
            message: {
                en: "User fetched successfully",
                ar: "تم تحميل المستخدم بنجاح",
            },
            user
        })
    } catch (error) {
       next(error) 
    }
}


export { getUsers, getUser };