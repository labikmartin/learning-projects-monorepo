import { notFound } from 'next/navigation';
import { renderAsyncComponent } from '@libs/common/helpers';
import { render, screen } from '@testing-library/react';

import { getFoodBySlug } from '../../../db/api';

import FoodDetailPage from './page';

jest.mock('../../../db/api', () => ({
  getFoodBySlug: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('FoodDetailPage', () => {
  it('should render successfully', async () => {
    const mockFood = {
      instructions: 'Sample instructions',
      title: 'Sample Food',
    };

    (getFoodBySlug as jest.Mock).mockResolvedValueOnce(mockFood);

    await renderAsyncComponent(render, FoodDetailPage, {
      params: { foodId: 'foodId' },
    });

    expect(screen.getByText('Sample Food')).toBeTruthy();
    expect(screen.getByText('Sample instructions')).toBeTruthy();
  });

  it('should redirect to not found page', async () => {
    (getFoodBySlug as jest.Mock).mockResolvedValueOnce(null);

    await renderAsyncComponent(render, FoodDetailPage, {
      params: { foodId: 'foodId' },
    });

    expect(notFound).toHaveBeenCalled();
  });
});
