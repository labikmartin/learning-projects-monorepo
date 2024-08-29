import { s3 } from '../../libs/s3';

import { deleteImageFromS3 } from './deleteImageFromS3';

jest.mock('../../libs/s3', () => ({
  s3: {
    deleteObject: jest.fn(),
  },
}));

describe('deleteImageFromS3', () => {
  it('should delete image from S3 with correct parameters', async () => {
    const fileName = 'example.jpg';
    const s3BucketFolder = 'images';
    const Key = `${s3BucketFolder}/${fileName}`;

    await deleteImageFromS3(fileName, s3BucketFolder);

    expect(s3.deleteObject).toHaveBeenCalledWith({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key,
    });
  });
});
