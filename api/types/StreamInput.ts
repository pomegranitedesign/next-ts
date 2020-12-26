import { InputType, Field } from 'type-graphql';
import { ObjectID } from 'mongodb';
import { Stream } from '../entity/Stream';

@InputType()
export class StreamInput implements Partial<Stream> {
  @Field({ nullable: true })
  id?: ObjectID;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  url: string;
}
