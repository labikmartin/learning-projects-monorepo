import { fireEvent, render, screen } from '@testing-library/react';

import FoodSharePage from './page';

jest.mock('../../../db/api', () => ({
  saveFood: jest.fn(),
}));

describe('FoodSharePage', () => {
  test('should render successfully', async () => {
    const { container } = render(<FoodSharePage />);

    function getElementByNameAttribude(name: string) {
      return container.querySelector(`[name="${name}"]`);
    }

    const expectedAuthor = 'Johnny Doe';
    const expectedEmail = 'm@m.mm';
    const expectedTitle = 'Chicken Alfredo Pasta';
    const expectedDescription = 'Very tasty food!';
    const expectedInstructions = 'Step 1: Boil the pasta...';
    const expectedImage = new File(['yolo'], 'yolo.png', {
      type: 'image/png',
    });

    const author = getElementByNameAttribude('author') as HTMLInputElement;
    expect(author).toBeTruthy();
    fireEvent.change(author as HTMLInputElement, {
      target: { value: expectedAuthor },
    });
    expect(author.value).toBe(expectedAuthor);

    const authorEmail = getElementByNameAttribude(
      'author_email',
    ) as HTMLInputElement;
    expect(authorEmail).toBeTruthy();
    fireEvent.change(authorEmail as HTMLInputElement, {
      target: {
        value: expectedEmail,
      },
    });
    expect(authorEmail.value).toBe(expectedEmail);

    const description = getElementByNameAttribude(
      'description',
    ) as HTMLInputElement;
    expect(description).toBeTruthy();
    fireEvent.change(description as HTMLInputElement, {
      target: { value: expectedDescription },
    });
    expect(description.value).toBe(expectedDescription);

    const image = getElementByNameAttribude('image') as HTMLInputElement;
    expect(image).toBeTruthy();
    fireEvent.change(image as HTMLInputElement, {
      target: { files: [expectedImage] },
    });
    expect(image.files).toStrictEqual([expectedImage]);

    const instructions = getElementByNameAttribude(
      'instructions',
    ) as HTMLInputElement;
    expect(instructions).toBeTruthy();
    fireEvent.change(instructions as HTMLInputElement, {
      target: { value: expectedInstructions },
    });
    expect(instructions.value).toBe(expectedInstructions);

    const title = getElementByNameAttribude('title') as HTMLInputElement;
    expect(title).toBeTruthy();
    fireEvent.change(title as HTMLInputElement, {
      target: { value: expectedTitle },
    });
    expect(title.value).toBe(expectedTitle);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
  });
});
