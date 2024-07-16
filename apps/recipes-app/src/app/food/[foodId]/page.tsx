import { Box } from '@chakra-ui/react';
import { asyncTryCatch } from '@libs/common/helpers';
import { NextPageProps } from '@libs/common/types';
import { type Food } from '@libs/recipes-lib';

import { getFoodBySlug } from '../../../db/api';

export type FoodDetailPageProps = NextPageProps<{ foodId: string }>;

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
  const slug = params.foodId;
  const [food] = await asyncTryCatch(getFoodBySlug(slug) as Promise<Food>);

  if (!food) {
    return <div>Food not found</div>;
  }

  return (
    <div>
      <h1>{food.title}</h1>
      <Box style={{ whiteSpace: 'preserve-breaks' }}>
        <div
          dangerouslySetInnerHTML={{
            __html: food.instructions,
          }}
        />
      </Box>
    </div>
  );
}
