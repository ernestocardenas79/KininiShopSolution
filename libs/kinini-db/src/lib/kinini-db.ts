import MongoClient, {Db} from 'mongodb';
import chalk from 'chalk';

export class kininiDb {

  db:Db;
  async init(){
    const MONGO_DB = process.env.MONGO_DB_DATABASE || 'mongodb://localhost:27017/kinini-online-shop';
    const client = await MongoClient.connect(
      MONGO_DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      this.db = client.db();

      if(client.isConnected()){
        console.log('======================================= DATABASE ======================================= ');
        console.log(`STATUS: ${chalk.greenBright('ONLINE')}` );
        console.log(`DATABASE: ${chalk.greenBright(this.db.databaseName)}` );
        console.log('======================================= DATABASE ======================================= ');
      }

      return this.db;
  }
}

