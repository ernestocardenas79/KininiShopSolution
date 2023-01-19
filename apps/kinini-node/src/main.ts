
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
*/
import 'reflect-metadata';
import express from 'express';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import {environment} from './environments/environment';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {environmentSpecification} from './environments/environment.interface';
import {Db} from 'mongodb';

import {kininiDb} from './../../../libs/kinini-db/src/lib/kinini-db';
import {UserResolver} from './app/resolvers';
import {LoginResolver} from './app/resolvers/loginResolver';
import RecipeResolver from './app/example/recipie.resolver';

dotenv.config();

let env:environmentSpecification;
if(process.env.NODE_ENV != 'production'){
  env = environment;
  console.log({env});
}

export interface Context {
  db: Db
}


async function init(){
  const schema = await buildSchema({
    resolvers:[UserResolver, LoginResolver, RecipeResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema/schema.gql'),
      validate: {
        forbidUnknownValues:false
      }
  });

  const app = express();

  app.use('/assets', express.static(path.join(__dirname, 'assets')))
     .use('*',cors())
     .use(compression());

     const database = new kininiDb();
     await database.init();
     const db = database.db;

     const context: Context = {db};

  const server = new ApolloServer({
    schema,
    introspection: true,
    context
  });

  server.applyMiddleware({app});


  const port = env.PORT || 3333;
  const httpServer = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
    console.log('ONLINE - Api Kinonoshop');
  });
  httpServer.on('error', console.error);
}

init();
