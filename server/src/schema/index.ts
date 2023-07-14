import 'graphql-import-node';
import typeDefs from './schema.graphql';
import {type GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from '@graphql-tools/schema';
import resolvers from '../resolvers';

const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

export default schema;