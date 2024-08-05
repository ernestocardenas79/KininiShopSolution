/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {type IResolvers} from '@graphql-tools/utils';
import {COLLECTIONS} from '../config/constants';

const resolversMutation: IResolvers = {
	Mutation: {
		async register(_, {user}, {db}) {
			const lastUser = await db.collection(COLLECTIONS.USERS).find().limit(1).sort({lastUser: -1}).toArray();
            
			if (lastUser.length === 0)
				user.id = 1;
			else
				user.id = lastUser[0].id + 1;

			user.registerDate = new Date().toISOString();

			return db.
				collection(COLLECTIONS.USERS)
				.insertOne(user)
				.then(async () => user)
				.catch((err: Error) => {
					console.error(err.message);
					return null;
				});
		},
	},
};

export default resolversMutation;


