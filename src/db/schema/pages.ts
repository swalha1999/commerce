import {
  text,
  timestamp,
  pgTable
} from "drizzle-orm/pg-core";

export const pages = pgTable("pages", {
  id: text("id").primaryKey(),
  handle: text("handle").notNull().unique(),
  title: text("title").notNull(),
  body: text("body"),
  bodySummary: text("body_summary"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});