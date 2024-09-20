import { s3 } from '../../libs/s3';

export async function uploadImageToS3(
  fileName: string,
  image: File,
  s3BucketFolder: string,
) {
  const imageArrayBuffer = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageArrayBuffer);
  const Key = s3BucketFolder ? `${s3BucketFolder}/${fileName}` : fileName;

  await s3.putObject({
    Body: Buffer.from(imageBuffer),
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    ContentType: image.type,
    Key,
  });
}
