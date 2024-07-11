import sql from 'better-sqlite3';
const db = sql('./src/db/food.db');

export async function getFoodList() {
  return db.prepare('SELECT * FROM food').all();
}

export async function getFoodBySlug(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare('SELECT * FROM food WHERE slug = ?').get(slug);
}
