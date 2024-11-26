import { s3 } from '../../libs/s3';

export function deleteImageFromS3(imageName: string, bucketName: string) {
  const Key = bucketName ? `${bucketName}/${imageName}` : imageName;

  return s3.deleteObject({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key,
  });
}
