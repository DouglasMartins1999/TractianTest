import * as mongodb from "mongodb";

export const client = new mongodb.MongoClient(global.env.DB_CONN_URL);

export default function startQueryOn(collection) {
    return client
        .db(global.env.DB_CONN_NAME)
        .collection(collection);
};