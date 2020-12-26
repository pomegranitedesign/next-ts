import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectID } from 'mongodb';

export const ObjectIDScalar = new GraphQLScalarType({
  name: 'ObjectID',
  description: 'Mongo id scalar type',
  parseValue(value: string) {
    return new ObjectID(value); // Client from input variable
  },
  serialize(value: ObjectID) {
    return value.toHexString(); // Value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) return new ObjectID(ast.value); // Value from the client query
    return null;
  },
});
