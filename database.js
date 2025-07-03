const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'mini_graphql_test',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres'
  },
  asyncStackTraces: true,
});

const initializeDatabase = async () => {
  try {
    await db.schema.createTableIfNotExists('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.timestamps(true, true);
    });

    const userCount = await db('users').count('id as count');
    if (userCount[0].count === 0) {
      await db('users').insert([
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' }
      ]);
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

module.exports = { db, initializeDatabase };
