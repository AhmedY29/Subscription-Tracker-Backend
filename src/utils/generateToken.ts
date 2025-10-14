import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { UserInterface } from '../models/user.model';

const generateTokens = async (
  user: UserInterface
): Promise<{ accessToken: string; refreshToken: string }> => {
  const accessToken = jwt.sign(
    {
      type: 'access',
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    },
    jwtConfig.secret,
    jwtConfig.accessToken.options
  );

  const refreshToken = jwt.sign(
    {
      type: 'refresh',
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    },
    jwtConfig.secret,
    jwtConfig.refreshToken.options
  );

  return { accessToken, refreshToken };
};

export default generateTokens;