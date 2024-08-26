import { type Food, type FoodFormData } from '@libs/recipes-lib';
import sql from 'better-sqlite3';
import fs from 'node:fs';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import xss from 'xss';

import { processImageFile } from './helpers/processImageFile';
const db = sql('./src/db/food.db');

export async function getFoodList() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return db.prepare('SELECT * FROM food').all();
}

export async function getFoodById(id: string) {
  return db.prepare('SELECT * FROM food WHERE id = ?').get(id);
}

export async function getFoodBySlug(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return db.prepare('SELECT * FROM food WHERE slug = ?').get(slug);
}

export async function deleteByFoodId(id: string) {
  const food = (await getFoodById(id)) as Food;
  const image = food.image;
  const rootDir = process.cwd();
  const imageDir = `${rootDir}/public/images`;
  const filePath = `${imageDir}/${image}`;

  fs.unlinkSync(filePath);

  const deleteFood = db.prepare('DELETE FROM food WHERE id = ?');
  return deleteFood.run(id);
}

export async function saveFood(data: FoodFormData) {
  const slugIfiedTitle = slugify(data.title, { lower: true });

  const slugCount = (
    db
      .prepare('SELECT COUNT(*) FROM food WHERE slug = ?')
      .get(slugIfiedTitle) as { 'COUNT(*)': number }
  )['COUNT(*)'];

  const lastRowId = (
    db.prepare('SELECT MAX(id) FROM food').get() as {
      'MAX(id)': number;
    }
  )['MAX(id)'];

  const nextId = lastRowId + 1;
  const slug = slugCount === 0 ? slugIfiedTitle : `${slugIfiedTitle}-${nextId}`;
  const imageName = `${slugIfiedTitle}_${uuidv4()}`;
  const extension = data.image.name.split('.').pop() as string;
  const imageNameWithExtension = `${imageName}.${extension}`;

  const newFood = {
    ...data,
    image: imageNameWithExtension,
    instructions: xss(data.instructions),
    slug,
  } as Food;

  const insert = db.prepare(
    `INSERT INTO food
      (author, author_email, description, image, instructions, slug, title)
    VALUES
      (@author, @author_email, @description, @image, @instructions, @slug, @title)`,
  );
  const insertStatement = insert.run(newFood);
  const changes = insertStatement.changes;

  if (changes !== 0) {
    await processImageFile(data.image, imageName, extension);
  }

  return insertStatement;
}
