import { Flex, Heading, Text } from '@chakra-ui/react';
import { asyncTryCatch, getFormDataObject } from '@libs/common/helpers';
import { FoodFormData } from '@libs/recipes-lib';

import { saveFood } from '../../../db/api';

import { ShareForm } from './components/ShareForm';

export default function FoodSharePage() {
  async function handleShareFoodAction(data: FormData) {
    'use server';

    const formDataObject = getFormDataObject<FoodFormData>(data);

    await asyncTryCatch(saveFood(formDataObject));

    // TODO: remove log
    console.log({ formDataObject });
  }

  return (
    <Flex direction="column">
      <header>
        <Heading
          as="h1"
          color="orange.300"
          marginBottom={30}
          marginTop={10}
          size="3xl"
        >
          Share your food!
        </Heading>
      </header>
      <main>
        <Text fontSize="2xl" marginBottom={50}>
          Use the form to share your favorite food with the world!
        </Text>
        <ShareForm onSubmit={handleShareFoodAction} />
      </main>
    </Flex>
  );
}
