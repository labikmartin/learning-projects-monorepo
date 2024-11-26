import NextImage from 'next/image';
import { notFound } from 'next/navigation';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { asyncTryCatch } from '@libs/common/helpers';
import { type NextPageProps } from '@libs/common/types';
import { type Food } from '@libs/recipes-lib';

import { getFoodBySlug } from '../../../db/api';

export type FoodDetailPageProps = NextPageProps<{ foodId: string }>;

const bucket = process.env.NEXT_PUBLIC_BUCKET_URL;

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
  const slug = params.foodId;
  const [food] = await asyncTryCatch(getFoodBySlug(slug) as Promise<Food>);
  await asyncTryCatch((async () => {})());
  const { author, description, image, instructions, title } = food || {};

  if (!food) {
    return notFound();
  }

  return (
    <Flex direction="column">
      <header>
        <Heading
          as="h1"
          color="orange.300"
          marginBottom={70}
          marginTop={10}
          size="3xl"
        >
          {title}
        </Heading>
        <Text color="blue.600" fontSize="md" marginBottom={30}>
          by {author}
        </Text>
        <Box height="450px" position="relative" width="100%">
          <NextImage
            fill
            alt={food.title}
            sizes="100vw"
            src={`${bucket}${image}`}
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </header>
      <main>
        <Text fontSize="2xl" marginTop={30}>
          {description}
        </Text>
        <Box marginTop={50} style={{ whiteSpace: 'break-spaces' }}>
          <div
            dangerouslySetInnerHTML={{
              __html: instructions || '',
            }}
          />
        </Box>
      </main>
    </Flex>
  );
}
