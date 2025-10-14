import AppError from "../utils/appError";
import User from "../models/user.model";
import generateTokens from "../utils/generateToken";
import bcrypt from "bcryptjs";


const signUp = async (name: string,email: string, password: string) => {
        const existingUser = await User.findOne({ email});

        if(existingUser) {
            throw new AppError("User already exists", "المستخدم موجود بالفعل", 400);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashPassword});

        const { refreshToken, accessToken } = await generateTokens(newUser);
        const userObj = newUser.toObject();
        const safeUser = { ...userObj, password: undefined };
        return {user : safeUser, accessToken, refreshToken};
}


const signIn = async (email: string, password: string) => {
    const existingUser = await User.findOne({ email});

    if(!existingUser) {
        throw new AppError("User not found", "المستخدم غير موجود", 404);
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) {
       throw new AppError("Password or Email is incorrect", "كلمة المرور او البريد الالكتروني غير صحيح", 400);
    }

    const { refreshToken, accessToken } = await generateTokens(existingUser);
    const userObj = existingUser.toObject();
    const safeUser = { ...userObj, password: undefined };
    return {user: safeUser, accessToken, refreshToken};
}
export { signUp, signIn };

