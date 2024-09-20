import { renderAsyncComponent } from '@libs/common/helpers';
import { render, screen } from '@testing-library/react';

import { getFoodList } from '../../db/api';

import FoodListingPage from './page';

jest.mock('../../db/api', () => ({
  getFoodList: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('FoodListingPage', () => {
  it('should render successfully', async () => {
    const mockFoodList = [
      { id: '1', title: 'Sample Food 1' },
      { id: '2', title: 'Sample Food 2' },
    ];

    (getFoodList as jest.Mock).mockResolvedValueOnce(mockFoodList);

    await renderAsyncComponent(render, FoodListingPage);

    expect(screen.getByText('Sample Food 1')).toBeTruthy();
    expect(screen.getByText('Sample Food 2')).toBeTruthy();
  });
});
