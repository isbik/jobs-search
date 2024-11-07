import {
  pgTable,
  integer,
  serial,
  text,
  varchar,
  timestamp,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { categoryTable } from "./category";
import { userTable } from "./user";

export enum JobType {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  INTERNSHIP = "internship",
  CONTRACT = "contract",
}

export enum JobStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum JobExperience {
  NO_EXPERIENCE = "no_experience",
  FROM_1_YEAR_TO_3_YEARS = "from_1_year_to_3_years",
  FROM_3_YEARS_TO_6_YEARS = "from_3_years_to_6_years",
  MORE_THAN_6_YEARS = "more_than_6_years",
}

export const workTypeEnum = pgEnum("work_type", [
  JobType.FULL_TIME,
  JobType.PART_TIME,
  JobType.INTERNSHIP,
  JobType.CONTRACT,
]);

export const statusEnum = pgEnum("status", [
  JobStatus.PENDING,
  JobStatus.APPROVED,
  JobStatus.REJECTED,
]);

export const experienceEnum = pgEnum("experience", [
  JobExperience.NO_EXPERIENCE,
  JobExperience.FROM_1_YEAR_TO_3_YEARS,
  JobExperience.FROM_3_YEARS_TO_6_YEARS,
  JobExperience.MORE_THAN_6_YEARS,
]);

export const jobTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  minSalary: integer("min_salary").notNull(),
  maxSalary: integer("max_salary").notNull(),
  url: text("url").notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
  skills: text("skills")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),

  workType: workTypeEnum().notNull(),
  status: statusEnum().notNull().default(JobStatus.PENDING),
  experience: experienceEnum().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categoryTable.id),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const jobRelations = relations(jobTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [jobTable.categoryId],
    references: [categoryTable.id],
  }),
  user: one(userTable, {
    fields: [jobTable.userId],
    references: [userTable.id],
  }),
}));
