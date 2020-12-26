import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { MyContext } from '../types/MyContext';

const APP_SECRET = process.env.SESSION_SECRET || '';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers['authorization'];
  try {
    const token = authorization.replace('Bearer', '');
    const user = jwt.verify(token, APP_SECRET) as any;
    context.res.locals.userId = user.id;
    return next();
  } catch (err) {
    throw new Error(err.message);
  }
};
