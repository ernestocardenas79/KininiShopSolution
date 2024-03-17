import express from 'express';

import { createHandler }  from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
var { ruruHTML } = require("ruru/server");

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
      return "Hello world!"
    },
  }


const app = express();

// Create and use the GraphQL handler.
app.all(
    "/graphql",
    createHandler({
      schema: schema,
      rootValue: root,
    })
  )

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
  })

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});

