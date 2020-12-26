import { Arg, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../entity/User';
import { AuthInput } from '../types/AuthInput';
import { UserResponse } from '../types/UserResponse';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') { email, password }: AuthInput,
  ): Promise<UserResponse> {
    // 1. Check for an existing email in the database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error('Email already in use');

    // 2. Create a new user with a hashed password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });

    // Register the user / save the user to the database
    await user.save();

    // 3. Store user id on the token payload
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || '123rfwrw3rs3',
    );

    return {};
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: AuthInput,
  ): Promise<UserResponse> {
    // 1. Check for an existing email in the database
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) throw new Error("User doesn't exist");

    // 2. Find if the user's email and passwords are valid
    const valid = await bcrypt.compare(password, existingUser.password);
    if (!valid)
      throw new Error(
        'Invalid login information, please check email and password',
      );

    // 3. Store user id on the token payload
    const payload = {
      id: existingUser.id,
    };
    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || '123rfwrww3rs3',
    );

    return { user: existingUser, token };
  }
}
