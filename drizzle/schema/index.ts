import { integer, pgTable, uuid, varchar,timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";
import { desc, sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
    id: uuid('id').primaryKey().unique(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(), // Tambah unique
    password: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({mode: 'string'}).notNull(),
    updatedAt: timestamp({mode: 'string'}).notNull(),
  });
  
  export const eventsTable = pgTable("events", {
    id: uuid('id').primaryKey().unique(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    startDate: timestamp({mode: 'string'}).notNull(),
    endDate: timestamp({mode: 'string'}).notNull(),
    imageUrl: varchar({ length: 255 }), // Biarkan nullable
    isOnline: boolean().notNull(),
    location: varchar({ length: 255 }), // Biarkan nullable
    userId: uuid('user_id').references(() => usersTable.id).notNull(),
    categoryId: integer('category_id').references(() => categoriesTable.id).notNull(),
    createdAt: timestamp({mode: 'string'}).notNull(),
    updatedAt: timestamp({mode: 'string'}).notNull(),
  });
  
  export const categoriesTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull().unique(), // Tambah unique
  });
