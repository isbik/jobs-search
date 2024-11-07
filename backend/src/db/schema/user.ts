import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { companyTable } from "./company";

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(userTable, ({ one }) => ({
  company: one(companyTable, {
    fields: [userTable.id],
    references: [companyTable.userId],
  }),
}));
