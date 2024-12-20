import { type Food, type FoodFormData } from '@libs/recipes-lib';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import xss from 'xss';

import { deleteImageFromS3 } from './helpers/deleteImageFromS3';
import { uploadImageToS3 } from './helpers/uploadImageToS3';
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

  await deleteImageFromS3(image, 'test');

  const deleteFood = db.prepare('DELETE FROM food WHERE id = ?');
  return deleteFood.run(id);
}

export async function saveFood(data: FoodFormData) {
  const slugIfiedTitle = slugify(data.title, { lower: true });

  const slugCount = (
    db
      .prepare('SELECT COUNT(*) AS slugCount FROM food WHERE slug = ?')
      .get(slugIfiedTitle) as { slugCount: number }
  )['slugCount'];

  const lastRowId = (
    db.prepare('SELECT MAX(id) AS lastRowId FROM food').get() as {
      lastRowId: number;
    }
  )['lastRowId'];

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
    await uploadImageToS3(imageNameWithExtension, data.image, 'test');
  }

  return insertStatement;
}
