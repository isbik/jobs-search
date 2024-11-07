import {
  pgTable,
  integer,
  serial,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userTable } from "./user";

export const companyTable = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  logo: text("logo").notNull(),
  url: text("url").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const companyRelation = relations(companyTable, ({ one }) => ({
  user: one(userTable, {
    fields: [companyTable.userId],
    references: [userTable.id],
  }),
}));
