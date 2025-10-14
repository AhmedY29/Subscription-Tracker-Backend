import AppError from "../utils/appError";
import User from "../models/user.model";


const getAllUsers = async () => {
    const users = await User.find({}).lean().exec();
    return users;
}


const getOneUser = async (id: string) => {

    const user = await User.findById(id)

    if(!user){
        throw new AppError("User not found", "المستخدم غير موجود", 404);
    }

    return user;
}


export { getAllUsers, getOneUser };