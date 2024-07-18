'use client';

import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { ImagePicker } from '@libs/recipes-lib';

export function ShareForm({ onSubmit }: any) {
  const [files, setFiles] = useState<FileList | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    onSubmit(formData);
    formRef?.current?.reset();
    setFiles(null);
  };

  return (
    <Box action={handleSubmit} as="form" maxWidth="50%" ref={formRef}>
      <Flex direction="column" gap="20px">
        <Flex gap="20px">
          <FormControl>
            <FormLabel htmlFor="author">Your name</FormLabel>
            <Input id="author" name="author" placeholder="Johnny Doe" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="author_email">Your email</FormLabel>
            <Input
              id="author_email"
              name="author_email"
              placeholder="mail@email.com"
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel htmlFor="title">Food name</FormLabel>
          <Input id="title" name="title" placeholder="Chicken Alfredo Pasta" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Food description</FormLabel>
          <Input
            id="description"
            name="description"
            placeholder="Very tasty food!"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="instructions">Food instructions</FormLabel>
          <Textarea
            id="instructions"
            name="instructions"
            placeholder={`Step 1: Boil the pasta...
Step 2: Add the sauce...`}
            resize="vertical"
            rows={15}
          />
        </FormControl>
        <ImagePicker
          accept="image/png, image/jpeg, image/jpg, image/webp"
          files={files}
          id="image"
          label="Upload picture"
          name="image"
          setFiles={setFiles}
        />
        <Button
          alignSelf="flex-start"
          colorScheme="orange"
          type="submit"
          width={200}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
}
