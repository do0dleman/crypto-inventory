// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `crypto-inventory_${name}`);

export const posts = createTable(
  "coins",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    name: varchar("name", { length: 48 }),
    symbol: varchar("symbol", { length: 24 })
  }
);
