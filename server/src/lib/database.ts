import {Db, MongoClient} from 'mongodb';

class Database {
	async init() {
  		const MONGO_DB = process.env.DATABASE ?? 'mongodb://localhost:27017/menag-online-shop';
		const client = await MongoClient.connect(
			MONGO_DB,
			{
				useNewUrlParser:true,
				useUnifiedTopology:true,
			}, 
		);       

		const db = client.db();

		if (client.isConnected()) {
			console.log('database => Status: ONLINE');
			console.log(`database => Name: ${db.databaseName}`);
		}

		return db;
	}
}

export default Database;