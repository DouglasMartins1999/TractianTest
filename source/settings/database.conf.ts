import * as mongodb from "mongodb";

export const client = new mongodb.MongoClient(global.env.DB_CONN_URL);

const instance = client.db(global.env.DB_CONN_NAME);

export default instance;