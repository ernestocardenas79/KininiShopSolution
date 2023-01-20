import {Db} from 'mongodb';

export interface Context {
  db: Db;
  token:string
}

export interface Communication {
  req:IRequest,
  connection: IConnection
}

interface IRequest {
  headers:{
    authorization: string;
  }
}

interface IConnection {
  authorization:string;
}
