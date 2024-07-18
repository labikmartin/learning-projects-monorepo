import { tryCatch } from './tryCatch';

describe('tryCatch', () => {
  test('should execute the try block and return its result', () => {
    const [result] = tryCatch(() => {
      return 'Success';
    });

    expect(result).toBe('Success');
  });

  test('should catch and handle any errors thrown in the try block', () => {
    const [_, error] = tryCatch(() => {
      throw new Error('Something went wrong');
    }) as [unknown, Error];

    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Something went wrong');
  });
});
