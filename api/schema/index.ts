import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { ObjectID } from 'mongodb';
import path from 'path';
import { UserResolver } from '../resolvers/UserResolver';
import { AuthResolver } from '../resolvers/AuthResolver';
import { StreamResolver } from '../resolvers/StreamResolver';
import { ObjectIDScalar } from './object-id.scalar';
import { TypegooseMiddleware } from '../middleware/typegoose';

// Build type-graphql executable scheme
export async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    // Add typescript resolvers
    resolvers: [UserResolver, StreamResolver, AuthResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    // Use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // Use object id scalars mapping
    scalarsMap: [{ type: ObjectID, scalar: ObjectIDScalar }],
    validate: false,
  });
  return schema;
}
