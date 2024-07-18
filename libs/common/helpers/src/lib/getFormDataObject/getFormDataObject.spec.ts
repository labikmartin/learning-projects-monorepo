import { getFormDataObject } from './getFormDataObject';

describe('getFormDataObject', () => {
  it('should return an object with the specified keys and their corresponding values from FormData', () => {
    const formData = new FormData();
    formData.append('$ACTION_ID_7d63fddad679c680692e914f55fa0699ed847ecb', '');
    formData.append('email', 'john.doe@mail.com');
    formData.append('name', 'John Doe');

    const expectedResult = {
      email: 'john.doe@mail.com',
      name: 'John Doe',
    };

    const result = getFormDataObject<typeof expectedResult>(formData);

    expect(result).toEqual(expectedResult);
  });
});
