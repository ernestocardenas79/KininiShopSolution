import {type IResolvers} from '@graphql-tools/utils';
import Query from './query';
import Mutation from './mutation';

const resolvers: IResolvers = {
	...Query,
	...Mutation,
};

export default resolvers;