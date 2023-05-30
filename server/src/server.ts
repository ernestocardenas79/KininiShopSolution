import {ApolloServer} from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import chalk from 'chalk';

import schema from './schema';

async function init() {
	const app = express();

	app
	// .use('*',cors)
		.use(compression());

	const server = new ApolloServer({
		schema,
		introspection: true,
	});

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const PORT = process.env.PORT ?? 2002;
	await server.start();
	server.applyMiddleware({app});
	app.listen(PORT);
}

void init();