export async function asyncTryCatch<T>(
  promise: Promise<T> | undefined,
): Promise<[T | null, unknown]> {
  if (promise === undefined) {
    return [null, null];
  }

  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
