import knex from 'knex';

const db = knex({
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
    });
    console.log('Table users created');
  } else {
    console.log('Table users already exists');
  }
};

const createSessionsTable = async () => {
  const exists = await db.schema.hasTable('sessions');
  if (!exists) {
    await db.schema.createTable('sessions', (table) => {
      table.increments('session_id').primary();
      table.bigInteger('fid').notNullable();
      table.timestamp('start_time', { useTz: true }).notNullable();
      table.timestamp('end_time', { useTz: true });
      table.enu('status', ['active', 'completed', 'abandoned']).notNullable();
      table.varchar('initial_state', 59).notNullable();
      table.varchar('current_state', 59).notNullable();
      table.foreign('fid').references('users.fid');
    });
    console.log('Table sessions created');
  } else {
    console.log('Table sessions already exists');
  }
};

const createMovesTable = async () => {
  const exists = await db.schema.hasTable('moves');
  if (!exists) {
    await db.schema.createTable('moves', (table) => {
      table.increments('move_id').primary();
      table.integer('session_id').notNullable();
      table.integer('move_sequence').notNullable();
      table.string('move_notation', 10).notNullable();
      table.varchar('from_state', 59).notNullable();
      table.varchar('to_state', 59).notNullable();
      table.timestamp('move_timestamp', { useTz: true }).defaultTo(db.fn.now());

      // Add onDelete('CASCADE') to automatically delete moves when the associated session is deleted
      table.foreign('session_id').references('sessions.session_id').onDelete('CASCADE');
    });
    console.log('Table moves created');
  } else {
    console.log('Table moves already exists');
  }
};

const createWelcomeAirdropsTable = async () => {
  const exists = await db.schema.hasTable('welcome_airdrops');
  if (!exists) {
    await db.schema.createTable('welcome_airdrops', (table) => {
      table.increments('id').primary(); // Primary key
      table.bigInteger('fid').notNullable(); // User foreign ID
      table.string('token', 255).notNullable(); // Token name or symbol
      table.integer('amount').notNullable(); // Token amount as an integer
      table.string('address', 42).nullable(); // Blockchain address, now nullable
      table.integer('session_id').unsigned().nullable(); // New column for session_id as an unsigned integer

      table.foreign('fid').references('users.fid'); // Foreign key relationship to the 'users' table
      table.foreign('session_id').references('sessions.session_id').onDelete('SET NULL');; // Foreign key relationship to the 'sessions' table
    });
    console.log('Table welcome_airdrops created');
  } else {
    console.log('Table welcome_airdrops already exists');
  }
};

const createSmartContractsTable = async () => {
  const exists = await db.schema.hasTable('smart_contracts');
  if (!exists) {
    await db.schema.createTable('smart_contracts', (table) => {
      table.increments('id').primary();
      table.string('ticker').notNullable();
      table.json('abi').notNullable();
      table.string('address', 42).notNullable(); // Assuming Ethereum addresses which are 42 characters long including the '0x'
      table.integer('amount').notNullable();
      table.enu('status', ['active', 'inactive']).defaultTo('active').notNullable();
    });
    console.log('Table smart_contracts created');
  } else {
    console.log('Table smart_contracts already exists');
  }
};


export const initialize = async()=>{
  await createUsersTable();
  await createSessionsTable();
  await createMovesTable();
  await createWelcomeAirdropsTable();
  await createSmartContractsTable();
}

await initialize();

process.exit(0);