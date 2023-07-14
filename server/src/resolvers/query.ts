import {type IResolvers} from '@graphql-tools/utils';

const resolversQuery: IResolvers = {
	Query:{
		users(root, args, context, info) {
			return [{
				id:1,
				name: 'Ernesto',
				lastname: 'Cardenas',
				email: 'ernesto@as.com',
				password: 'aaa',
				registerDate: '',
				birthday: '',
			}];
		},
	},
};

export default resolversQuery;