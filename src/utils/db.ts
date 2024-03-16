import knex, { Knex } from 'knex';

const db: Knex = knex({
  client: 'postgres',
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 80 },
});

const createUsersTable = async () => {
  const exists = await db.schema.hasTable('users');
  if (!exists) {
    await db.schema.createTable('users', (table) => {
      table.increments('user_id').primary();
      table.bigInteger('fid').notNullable().unique();
      table.timestamp('created_at', { useTz: true }).defaultTo(db.fn.now());
    });
    console.log('Table users created');
  } else {
    console.log('Table users already exists');
  }
};

const createPollsTable = async () => {
  const exists = await db.schema.hasTable('polls');
  if (!exists) {
    await db.schema.createTable('polls', (table) => {
      table.increments('poll_id').primary();
      table.bigInteger('fid').notNullable().references('fid').inTable('users'); // Reference 'fid' instead of 'user_id'
      table.string('question').notNullable();
      table.string('options').notNullable();
      table.timestamp('deadline', { useTz: true }).notNullable();
      table.timestamp('created_at', { useTz: true }).defaultTo(db.fn.now());
    });
    console.log('Table polls created');
  } else {
    console.log('Table polls already exists');
  }
};

const createPollOptionsTable = async () => {
  const exists = await db.schema.hasTable('poll_options');
  if (!exists) {
    await db.schema.createTable('poll_options', (table) => {
      table.increments('option_id').primary();
      table.integer('poll_id').notNullable().references('poll_id').inTable('polls');
      table.string('option_text', 255).notNullable();
      table.timestamp('created_at', { useTz: true }).defaultTo(db.fn.now());
    });
    console.log('Table poll_options created');
  }
};

const createPollVotesTable = async () => {
  const exists = await db.schema.hasTable('poll_votes');
  if (!exists) {
    await db.schema.createTable('poll_votes', (table) => {
      table.increments('vote_id').primary();
      table.integer('poll_id').notNullable().references('poll_id').inTable('polls');
      table.integer('option_id').notNullable().references('option_id').inTable('poll_options');
      table.bigInteger('fid').notNullable().references('fid').inTable('users'); // Reference 'fid' instead of 'user_id'
      table.timestamp('created_at', { useTz: true }).defaultTo(db.fn.now());
    });
    console.log('Table poll_votes created');
  }
};

export const initialize = async()=>{
  await createUsersTable();
  await createPollsTable();
  await createPollOptionsTable();
  await createPollVotesTable();
}

export default db;