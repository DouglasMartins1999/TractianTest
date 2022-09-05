import { Knex, knex } from "knex";
import utils from "../tools/utils.handler";

export const config: Knex.Config = {
    client: global.env.DB_DIALECT,
    connection: {
        host: global.env.DB_HOST,
        user: global.env.DB_USER,
        password: global.env.DB_PSWD,
        database: global.env.DB_DATABASE,
        port: global.env.DB_PORT
    },
    migrations: {
        directory: ".",
        schemaName: global.env.DB_MSCHEMA,
        loadExtensions: [ ".schema.js" ],
    },
    pool: {
        min: global.env.DB_MIN_POOL_SIZE ?? 2, 
        max: global.env.DB_MAX_POOL_SIZE ?? 20,
        afterCreate(conn, done) {
            conn.query("select 1", error => done(error, conn));
            
            conn.on("debug", console.info);
            conn.on("notice", console.info);
        }
    }
};

export default knex(config);