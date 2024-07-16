import { render, screen, waitFor } from '@testing-library/react';

import { getFoodBySlug } from '../../../db/api';

import FoodDetailPage, { type FoodDetailPageProps } from './page';

jest.mock('../../../db/api', () => ({
  getFoodBySlug: jest.fn(),
}));

async function renderAsyncComponent(
  Component: typeof FoodDetailPage,
  props: FoodDetailPageProps,
) {
  let AsyncComponent = await Component(props);
  render(AsyncComponent);
}

describe('FoodDetailPage', () => {
  it('should render successfully', async () => {
    const mockFood = {
      instructions: 'Sample instructions',
      title: 'Sample Food',
    };

    (getFoodBySlug as jest.Mock).mockResolvedValueOnce(mockFood);

    renderAsyncComponent(FoodDetailPage, { params: { foodId: 'foodId' } });

    await waitFor(() => expect(screen.getByText('Sample Food')).toBeTruthy());
    expect(screen.getByText('Sample instructions')).toBeTruthy();
  });

  it('should render "Food not found" when food is not found', async () => {
    (getFoodBySlug as jest.Mock).mockResolvedValueOnce(null);

    renderAsyncComponent(FoodDetailPage, { params: { foodId: 'foodId' } });

    await waitFor(() =>
      expect(screen.getByText('Food not found')).toBeTruthy(),
    );
  });
});
