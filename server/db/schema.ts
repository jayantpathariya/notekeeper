import { z } from "zod";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("crated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);

export const usersRelation = relations(users, ({ many }) => ({
  notebooks: many(notebooks),
}));

export const notebooks = pgTable("notebooks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const insertNotebookSchema = createInsertSchema(notebooks, {
  userId: z.coerce.string(),
});

export const notebooksRelation = relations(notebooks, ({ one, many }) => ({
  user: one(users, {
    fields: [notebooks.userId],
    references: [users.id],
  }),
  notes: many(notes),
}));

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  notebookId: integer("notebook_id")
    .references(() => notebooks.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const insertNoteSchema = createInsertSchema(notes, {
  notebookId: z.coerce.string(),
});

export const notesRelation = relations(notes, ({ one }) => ({
  notebook: one(notebooks, {
    fields: [notes.notebookId],
    references: [notebooks.id],
  }),
}));
