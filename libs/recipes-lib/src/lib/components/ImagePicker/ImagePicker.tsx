'use client';

import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { AddIcon } from '@chakra-ui/icons';
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';

import styles from './ImagePicker.module.scss';

interface ImagePickerProps {
  accept?: string;
  files: FileList | null;
  id: string;
  label: string;
  name: string;
  setFiles: (files: FileList | null) => void;
}

export function ImagePicker({
  accept = 'image/png, image/jpeg, image/jpg, image/webp',
  files,
  id,
  label,
  name,
  setFiles,
}: ImagePickerProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFiles(event.target.files);
  }

  function previewImage() {
    if (!files) {
      setImagePreview(null);
      return null;
    }

    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const image = event?.target?.result as string;
      setImagePreview(image);
    };
  }

  useEffect(() => {
    previewImage();
  }, [files]);

  return (
    <FormControl className={styles['ImagePicker']}>
      <FormLabel className={styles['ImagePicker-label']} htmlFor={id}>
        <AddIcon />
        <span>{label}</span>
      </FormLabel>
      <Input
        accept={accept}
        className={styles['ImagePicker-input']}
        id={id}
        name={name}
        type="file"
        variant="flushed"
        onChange={handleChange}
      />
      {imagePreview && (
        <Box height="400px" position="relative">
          <NextImage
            fill
            alt="Preview"
            className={styles['ImagePicker-preview']}
            src={imagePreview}
          />
        </Box>
      )}
    </FormControl>
  );
}
