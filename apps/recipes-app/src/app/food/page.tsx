import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

import { getFoodList } from '../../db/api';

const FoodItem = ({
  author,
  description,
  image,
  slug,
  title,
}: Record<string, string>) => (
  <NextLink href={`/food/${slug}`}>
    <Card maxW="sm">
      <CardBody>
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
          <Text color="blue.600" fontSize="sm">
            {author}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  </NextLink>
);

export default async function FoodListingPage() {
  const foodList = (await getFoodList()) as Record<string, string>[];

  return (
    <div>
      <Flex gap={15} justify="center" wrap="wrap">
        {foodList.map((foodItem) => (
          <FoodItem key={foodItem.title} {...foodItem} />
        ))}
      </Flex>
    </div>
  );
}
