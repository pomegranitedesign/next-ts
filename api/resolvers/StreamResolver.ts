import {
  Resolver,
  Query,
  Mutation,
  FieldResolver,
  Ctx,
  Arg,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { ObjectID } from 'mongodb';
import { MyContext } from '../types/MyContext';
import { User, UserModel } from '../entity/User';
import { Stream, StreamModel } from '../entity/Stream';
import { ObjectIDScalar } from '../schema/object-id.scalar';
import { StreamInput } from '../types/StreamInput';
import { isAuth } from '../middleware/isAuth';

@Resolver(() => Stream)
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  async stream(@Arg('streamId', () => ObjectIDScalar) streamId: ObjectID) {
    return StreamModel.findById(streamId);
  }

  @Query(() => [Stream])
  @UseMiddleware(isAuth)
  async streams(@Ctx() ctx: MyContext) {
    // Display all streams for the current user
    return StreamModel.find({ author: ctx.res.locals.userId });
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async addStream(
    @Arg('input') streamInput: StreamInput,
    @Ctx() ctx: MyContext,
  ): Promise<Stream> {
    // Create a new user's stream
    const stream = new StreamModel({
      ...streamInput,
      author: ctx.res.locals.userId,
    } as Stream);
    await stream.save();
    return stream;
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async editStream(
    @Arg('input') streamInput: StreamInput,
    @Ctx() ctx: MyContext,
  ): Promise<Stream> {
    const { id, title, description, url } = streamInput;
    const stream = await StreamModel.findOneAndUpdate(
      {
        _id: id,
        author: ctx.res.locals.userId,
      },
      { title, description, url },
      { runValidators: true, new: true },
    );

    if (!stream) throw new Error('Stream not found...');
    return stream;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteStream(
    @Arg('streamId', () => ObjectIDScalar) streamId: ObjectID,
    @Ctx() ctx: MyContext,
  ): Promise<Boolean | undefined> {
    const deleted = await StreamModel.findOneAndDelete({
      _id: streamId,
      author: ctx.res.locals.userId,
    });

    if (!deleted) throw new Error('Stream not found...');
    return true;
  }

  @FieldResolver()
  async author(@Root() stream: Stream): Promise<User | null> {
    return await UserModel.findById(stream.author);
  }
}
