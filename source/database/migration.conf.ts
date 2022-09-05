const utilsHandler = require("../tools/utils.handler");
const path = require("path");

const schema = (knex) => [
    {
        name: "users",
        builder(table) {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.integer("age").notNullable();
            table.boolean("isAdmin").notNullable();
            table.timestamp("created_at").defaultTo(knex.raw("NOW()"));
            table.timestamp("updated_at").defaultTo(knex.raw("NOW()"));
        }
    }
]

exports.up = async function(knex) {
    const tables = schema(knex);
    // const procedures = utilsHandler.fileFinder("")
console.log(tables);
    for (const t of tables) {
        if (!await knex.schema.hasTable(t.name)) {
            await knex.schema.createTable(t.name, t.builder);
        }
    }
};

exports.down = async function(knex) {
    const tables = schema(knex);

    for (const t of tables) {
        await knex.raw(`DROP TABLE IF EXISTS ? CASCADE`, t.name);
    }
};
