import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

export const carts = pgTable("carts", {
  id: text("id").primaryKey(),
  checkoutUrl: text("checkout_url"),
  subtotalAmount: decimal("subtotal_amount", { precision: 10, scale: 2 }).default("0.00"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).default("0.00"),
  totalTaxAmount: decimal("total_tax_amount", { precision: 10, scale: 2 }).default("0.00"),
  currencyCode: varchar("currency_code", { length: 3 }).default("ILS"),
  totalQuantity: integer("total_quantity").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartLines = pgTable("cart_lines", {
  id: text("id").primaryKey(),
  cartId: text("cart_id"),
  variantId: text("variant_id"),
  quantity: integer("quantity").notNull().default(1),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});