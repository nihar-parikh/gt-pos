// import { column, Schema, Table } from '@powersync/web';

// export const LISTS_TABLE = 'lists';
// export const TODOS_TABLE = 'todos';

// const todos = new Table(
//   {
//     list_id: column.text,
//     created_at: column.text,
//     completed_at: column.text,
//     description: column.text,
//   metadata: column.text,
//     created_by: column.text,
//     completed_by: column.text,
//     completed: column.integer
//   },
//   { indexes: { list: ['list_id'], description: ['description'], // for search
//       completed: ['completed']      // for filtering
//        } }
// );

// const lists = new Table({
//   created_at: column.text,
//   name: column.text,
//   owner_id: column.text
// },
// {
//     indexes: {
//       name: ['name'] // for search
//     }
//   });

// export const AppSchema = new Schema({
//   todos,
//   lists
// });

// export type Database = (typeof AppSchema)['types'];
// export type TodoRecord = Database['todos'];
// // OR:
// // export type Todo = RowType<typeof todos>;

// export type ListRecord = Database['lists'];

import { DrizzleAppSchema } from '@powersync/drizzle-driver';
import { relations } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Tables
export const lists = sqliteTable(
  'lists',
  {
    id: text('id').primaryKey(), // Required by PowerSync schema
    created_at: text('created_at'),
    name: text('name'),
    owner_id: text('owner_id'),
  },
  (table) => ({
    nameIdx: index('lists_name_idx').on(table.name), // for search
  })
);

export const todos = sqliteTable(
  'todos',
  {
    id: text('id').primaryKey(), // Required by PowerSync schema
    list_id: text('list_id'),
    created_at: text('created_at'),
    completed_at: text('completed_at'),
    description: text('description'),
    metadata: text('metadata'),
    created_by: text('created_by'),
    completed_by: text('completed_by'),
    completed: integer('completed'),
  },
  (table) => ({
    listIdx: index('todos_list_id_idx').on(table.list_id),
    descriptionIdx: index('todos_description_idx').on(table.description), // for search
    completedIdx: index('todos_completed_idx').on(table.completed), // for filtering
  })
);

export const listsRelations = relations(lists, ({ many }) => ({
  todos: many(todos),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  list: one(lists, {
    fields: [todos.list_id],
    references: [lists.id],
  }),
}));

export const drizzleSchema = {
  lists,
  todos,
  listsRelations,
  todosRelations,
};

export const AppSchema = new DrizzleAppSchema(drizzleSchema);
