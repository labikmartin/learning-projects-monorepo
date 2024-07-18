import { processImageFile } from './processImageFile';

jest.mock('node:fs', () => ({
  createWriteStream: jest.fn(),
}));

describe('processImageFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const imageDirectory = `${process.cwd()}/public/images`;
  const mockImage = {
    arrayBuffer: jest.fn().mockResolvedValue(Buffer.from('test image')),
    name: 'test.jpg',
  } as unknown as File;
  const imageName = mockImage.name.split('.').shift() as string;
  const extension = mockImage.name.split('.').pop() as string;

  const mockWrite = jest.fn();
  const mockWriteStream = jest
    .spyOn(require('node:fs'), 'createWriteStream')
    .mockReturnValue({
      write: mockWrite,
    } as any);

  test('should save the image file with provided name and extension', async () => {
    await processImageFile(mockImage, imageName, extension);

    const imageArrayBuffer = await mockImage.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);

    expect(mockWriteStream).toHaveBeenCalledWith(
      expect.stringContaining(`${imageDirectory}/${mockImage.name}`),
    );
    expect(mockWrite).toHaveBeenCalledWith(imageBuffer);
  });
});
