import { asyncTryCatch } from './asyncTryCatch';

describe('asyncTryCatch', () => {
  test('should execute the try block and return its result for async functions', async () => {
    const [result] = await asyncTryCatch<string>(
      (async () => {
        return 'Success';
      })(),
    );

    expect(result).toBe('Success');
  });

  test('should catch and handle any errors thrown in the try block for async functions', async () => {
    const [_, error] = (await asyncTryCatch(
      (async () => {
        throw new Error('Something went wrong');
      })(),
    )) as [unknown, Error];

    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Something went wrong');
  });
});
