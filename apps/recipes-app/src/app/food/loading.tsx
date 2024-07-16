import { Flex, Spinner } from '@chakra-ui/react';

export default function LoadingFood() {
  return (
    <Flex align="center" height="100%" justify="center" width="100%">
      <Flex align="center" as="h1" gap={10}>
        Loading... <Spinner color="red.500" size="xl" />
      </Flex>
    </Flex>
  );
}
