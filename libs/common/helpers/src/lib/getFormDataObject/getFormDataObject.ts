export function getFormDataObject<
  T extends Record<keyof T, FormDataEntryValue | null>,
>(formData: FormData): T {
  const formDataCopy = new FormData();

  for (const [key, value] of formData.entries()) {
    formDataCopy.append(key, value);
  }

  formDataCopy.forEach((_, key) => {
    const serverActionIdPattern = /\$ACTION_ID_(.*)/g;
    const match = serverActionIdPattern.exec(key);

    if (match) {
      formDataCopy.delete(key);
    }
  });

  return Object.fromEntries(
    formDataCopy as unknown as Iterable<readonly [PropertyKey, any]>,
  ) as T;
}
