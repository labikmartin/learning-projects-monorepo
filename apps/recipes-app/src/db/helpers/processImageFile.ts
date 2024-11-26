import fs from 'node:fs';

export async function processImageFile(
  image: File,
  name: string,
  extension: string,
) {
  const rootDir = process.cwd();
  const imageDir = `${rootDir}/public/images`;
  const imageArrayBuffer = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageArrayBuffer);

  const fileName = `${name}.${extension}`;

  fs.createWriteStream(`${imageDir}/${fileName}`).write(imageBuffer);
}
