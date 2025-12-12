import {
  boolean,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  handle: text("handle").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  descriptionHtml: text("description_html"),
  availableForSale: boolean("available_for_sale").default(true),
  tags: text("tags").array(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  featuredImageUrl: text("featured_image_url"),
  featuredImageAlt: text("featured_image_alt"),
  featuredImageWidth: integer("featured_image_width"),
  featuredImageHeight: integer("featured_image_height"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productImages = pgTable("product_images", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: text("alt_text"),
  width: integer("width"),
  height: integer("height"),
});

export const productOptions = pgTable("product_options", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  values: text("values").array(),
});

export const productVariants = pgTable("product_variants", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id, { onDelete: "cascade" }),
  title: text("title"),
  availableForSale: boolean("available_for_sale").default(true),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currencyCode: varchar("currency_code", { length: 3 }).default("ILS"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productSelectedOptions = pgTable("product_selected_options", {
  id: text("id").primaryKey(),
  variantId: text("variant_id").references(() => productVariants.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  value: text("value").notNull(),
});

export const variantImages = pgTable("variant_images", {
  id: text("id").primaryKey(),
  variantId: text("variant_id").references(() => productVariants.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: text("alt_text"),
  width: integer("width"),
  height: integer("height"),
});