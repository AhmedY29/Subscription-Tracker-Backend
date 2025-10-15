import { sendSubscriptionEmail } from "../utils/send-email";
import Subscription from "../models/subscription.model";
import User from "../models/user.model";
import AppError from "../utils/appError";



const getAllSubscriptions = async () => {
    const subscriptions = await Subscription.find();
    return subscriptions;
}


const getOneSubscription = async (id: string) => {
    const subscription = await Subscription.findById(id);
    if (!subscription) {
        throw new AppError("Subscription not found", "الاشتراك غير موجود", 404);
    }

    return subscription;
}

const getSubscriptionByUserId = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", "المستخدم غير موجود", 404);
    }
    
    const subscriptions = await Subscription.find({ user: userId });

    return subscriptions;
}


const createSubscription = async (subscriptionData: any, userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", "المستخدم غير موجود", 404);
    }
    
    const subscription = await Subscription.create({ ...subscriptionData, user: userId });

    await sendSubscriptionEmail({ to: user.email, userName: user.name, subscriptionName: subscription.name, price: subscription.price, frequency: subscription.frequency, startDate: subscription.startDate, currency: subscription.currency });
    return subscription;
}



export { getAllSubscriptions, getOneSubscription, getSubscriptionByUserId, createSubscription }