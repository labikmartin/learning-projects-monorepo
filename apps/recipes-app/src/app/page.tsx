import NextImage from 'next/image';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Logo } from '@libs/recipes-lib';

export default async function Index() {
  return (
    <Flex alignItems="center" as="main" direction="column">
      <Flex gap={100} marginTop={20} width="90%">
        <Box boxShadow="dark-lg" overflow="hidden" rounded="md" width="xl">
          <Image alt="img" as={NextImage} src={Logo as unknown as string} />
        </Box>
        <Box>
          <Heading as="h1" color="orange.300" marginTop={10} size="3xl">
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
