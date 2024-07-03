import NextImage from 'next/image';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Logo } from '@libs/recipes-lib';

import styles from './page.module.scss';

export default async function Index({ params }) {
  return (
    <Flex as="main" direction="column" alignItems="center">
      <Flex width="90%" gap={100} marginTop={20}>
        <Box overflow="hidden" width="xl" rounded="md" boxShadow="dark-lg">
          <Image as={NextImage} src={Logo as unknown as string} alt="img" />
        </Box>
        <Box>
          <Heading as="h1" size="3xl" color="orange.300" marginTop={10}>
            Ultra Mega Food. <br />
            Because YOLO!
          </Heading>
          <Text fontSize={30} marginTop={10}>
            Share & Taste the best food from around the world!
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
