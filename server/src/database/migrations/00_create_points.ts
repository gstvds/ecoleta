import Knex from 'knex'; // Imports with capital letters are commonly used to declare types

// UP function is used to create the table
export async function up(knex: Knex) {
  // Create table receives the table name as the first argument and the function to create the table as the second argument
  return knex.schema.createTable('points', (table) => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); // The second parameter of .string() method is used to define the limit of characteres of that string;
  })
}

// DOWN function is used to delete the table
export async function down(knex: Knex) {
  return knex.schema.dropTable('points');
}