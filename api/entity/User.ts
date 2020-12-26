import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectID } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'This is a simple User model definition' })
export class User {
  @Field()
  readonly _id: ObjectID;

  @Field()
  @Property({ required: true })
  email: string;

  @Property({ required: true })
  password: string;
}

export const UserModel = getModelForClass(User);
