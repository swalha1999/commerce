import {
  text,
  timestamp,
  pgTable
} from "drizzle-orm/pg-core";

export const collections = pgTable("collections", {
  id: text("id").primaryKey(),
  handle: text("handle").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  path: text("path"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});