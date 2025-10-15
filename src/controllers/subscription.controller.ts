import { Request, Response, NextFunction } from "express";
import * as SubscriptionService from '../services/subscription.service';


const getSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptions = await SubscriptionService.getAllSubscriptions();
        res.status(200).json({
            success: true,
            message: {
                en: "Subscriptions fetched successfully",
                ar: "تم تحميل الاشتراكات بنجاح",
            },
            subscriptions,
        });
    } catch (error) {
        next(error);
    }
}


const getSubscriptionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscription = await SubscriptionService.getOneSubscription(req.params.id);
        res.status(200).json({
            success: true,
            message: {
                en: "Subscription fetched successfully",
                ar: "تم تحميل الاشتراك بنجاح",
            },
            subscription,
        });
    } catch (error) {
        next(error);
    }
}

const getSubscriptionByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptions = await SubscriptionService.getSubscriptionByUserId(req.params.id);
        res.status(200).json({
            success: true,
            message: {
                en: "Subscription fetched successfully",
                ar: "تم تحميل الاشتراك بنجاح",
            },
            subscriptions,
        });
    } catch (error) {
        next(error);
    }
}


const createSubscription = async (req: any, res: Response, next: NextFunction) => {
    try {
        const subscription = await SubscriptionService.createSubscription(req.body, req.user?._id);
        res.status(200).json({
            success: true,
            message: {
                en: "Subscription created successfully",
                ar: "تم انشاء الاشتراك بنجاح",
            },
            subscription,
        });
    } catch (error) {
        next(error);
    }
}



export { getSubscriptions, getSubscriptionById, getSubscriptionByUserId, createSubscription }