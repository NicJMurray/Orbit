import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable("enquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  receivedAt: integer("received_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [index("enquiries_received_at").on(table.receivedAt)]);
