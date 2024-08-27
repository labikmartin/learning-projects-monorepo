import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { asyncTryCatch } from '@libs/common/helpers';
import { Food, RemoveFoodButton } from '@libs/recipes-lib';

import { deleteByFoodId, getFoodList } from '../../db/api';

interface FoodItemProps extends Food {
  onDelete: (id: string) => Promise<void>;
}

const FoodItem = ({
  author,
  description,
  id,
  image,
  onDelete,
  slug,
  title,
}: FoodItemProps) => {
  return (
    <Card maxW="100%" width="sm">
      <CardBody>
        <NextLink href={`/food/${slug}`}>
          <Box
            borderRadius="md"
            height={300}
            overflow="hidden"
            position="relative"
            width="100%"
          >
            <NextImage
              fill
              alt={title}
              sizes="calc(100vw / 4)"
              src={`/images/${image}`}
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text>{description}</Text>
            <Text color="orange.400" fontSize="sm">
              {author}
            </Text>
          </Stack>
        </NextLink>
      </CardBody>
      <CardFooter paddingTop={0}>
        <RemoveFoodButton deleteBy={id} onDelete={onDelete} />
      </CardFooter>
    </Card>
  );
};

export default async function FoodListingPage() {
  const [foodList] = await asyncTryCatch(getFoodList() as Promise<Food[]>);

  async function handleDeleteFoodAction(id: string) {
    'use server';

    await asyncTryCatch(deleteByFoodId(id));
  }

  return (
    <div>
      <Flex gap={15} justify="center" wrap="wrap">
        {foodList?.map((foodItem) => (
          <FoodItem
            key={foodItem.id}
            {...foodItem}
            onDelete={handleDeleteFoodAction}
          />
        ))}
      </Flex>
    </div>
  );
}
