import jwt from 'jsonwebtoken'

import User from '../models/user.model'
import { Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/env';

const authorize = async (req: any, res: Response, next: NextFunction) => {
  try {
    let token;


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded : any = jwt.verify(token, JWT_SECRET as string);


    const user = await User.findById(decoded.user.id);

    if(!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;

    next();
  } catch (error: any) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
}

export default authorize;