import { Box } from '@chakra-ui/react';
import { NextPageProps } from '@libs/common/types';
import { type Food } from '@libs/recipes-lib';

import { getFoodBySlug } from '../../../db/api';

export default async function FoodDetailPage({
  params,
}: NextPageProps<{ foodId: string }>) {
  const slug = params.foodId;
  const food = (await getFoodBySlug(slug)) as Food;

  return (
    <div>
      <h1>{food.title}</h1>
      <Box style={{ whiteSpace: 'pre' }}>
        <div
          dangerouslySetInnerHTML={{
            __html: food.instructions,
          }}
        />
      </Box>
    </div>
  );
}
