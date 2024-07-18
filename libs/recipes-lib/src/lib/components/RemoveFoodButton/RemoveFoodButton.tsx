'use client';

import { useRouter } from 'next/navigation';
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

interface RemoveFoodButtonProps {
  deleteBy: string;
  onDelete: (deleteBy: string) => Promise<void>;
}

export function RemoveFoodButton({
  deleteBy,
  onDelete,
}: RemoveFoodButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    await onDelete(deleteBy);
    router.refresh();
  }

  return (
    <IconButton
      aria-label="Delete"
      colorScheme="red"
      fontSize="15px"
      icon={<DeleteIcon />}
      isRound={true}
      size="sm"
      variant="solid"
      onClick={handleDelete}
    />
  );
}
