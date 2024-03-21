import express from 'express';

import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";

import { createHandler }  from "graphql-http/lib/use/express";
import expressPlayground from 'graphql-playground-middleware-express'

import resolvers from "./app/resolvers"

const schemaWithResolvers = addResolversToSchema({
  schema: loadSchemaSync("./**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  }),
  resolvers
});

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();


// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({ schema: schemaWithResolvers})
)

app.get('/', expressPlayground({endpoint:"/graphql"}))

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
