export function tryCatch<D>(callback: () => D) {
  try {
    const data = callback();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
