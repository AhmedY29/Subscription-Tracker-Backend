import { Router } from "express";

import * as Subscription from '../controllers/subscription.controller';
import authorize from "../middlewares/auth.middleware";


const router = Router();

/**
 * @route GET api/subscriptions
 * @description Get all subscriptions
 * @access Public
 * @returns Subscriptions
 */

router.get('/', Subscription.getSubscriptions)

/**
 * @route GET api/subscriptions/:id
 * @description Get subscription by id
 * @access Public - authorization required
 * @param {string} id - Subscription id
 * @returns Subscription
 */
router.get('/:id', authorize, Subscription.getSubscriptionById)


/**
 * @route GET api/subscriptions/user/:id
 * @description Get subscriptions by user id
 * @access Public - authorization required
 * @param {string} id - User id
 * @returns Subscriptions
 */
router.get('/user/:id', authorize, Subscription.getSubscriptionByUserId)


/**
 * @route POST api/subscriptions
 * @description Create a new subscription
 * @access Public - authorization required
 * @param {string} name - Subscription name
 * @param {string} price - Subscription price
 * @param {string} currency - Subscription currency
 * @param {string} frequency - Subscription frequency
 * @param {string} startDate - Subscription start date
 * @returns Subscription
 */

router.post('/', authorize, Subscription.createSubscription)

export default router