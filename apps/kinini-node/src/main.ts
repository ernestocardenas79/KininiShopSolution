import express, {Express} from 'express';
import cors, {CorsOptions} from 'cors';
import compression from 'compression';
import {createServer} from 'http';
import {environment}from './environments/environment';

const corsOptions: CorsOptions = {origin: '*'};

async function init(){
  const app: Express = express();

  app.use(cors(corsOptions));

  app.use(compression());

  app.get('/',(_, res)=>{
    res.send('API MEANG - Online Shop Start');
  });

  const httpServer = createServer(app);

  httpServer.listen({port: environment.PORT},()=>{
    console.log(`listening in port ${environment.PORT}`);
  });
}

init();
