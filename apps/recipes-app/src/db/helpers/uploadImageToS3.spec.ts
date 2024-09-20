import { s3 } from '../../libs/s3';

import { uploadImageToS3 } from './uploadImageToS3';

jest.mock('../../libs/s3', () => ({
  s3: {
    putObject: jest.fn(),
  },
}));

describe('uploadImageToS3', () => {
  it('should upload image to S3 with correct parameters', async () => {
    const fileName = 'example.jpg';
    const s3BucketFolder = 'images';
    const Key = `${s3BucketFolder}/${fileName}`;
    const image = new File(['image content'], fileName, {
      type: 'image/jpeg',
    });
    image.arrayBuffer = jest.fn().mockResolvedValue(Buffer.from('test image'));

    await uploadImageToS3(fileName, image, s3BucketFolder);

    expect(s3.putObject).toHaveBeenCalledWith({
      Body: expect.any(Buffer),
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContentType: 'image/jpeg',
      Key,
    });
  });
});
