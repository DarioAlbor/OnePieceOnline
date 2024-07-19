import React from 'react';
import { Button, Center, Spinner } from '@chakra-ui/react';

const MoreCards = ({ onLoadMore, loading }) => {
  return (
    <Center py={5}>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Button onClick={onLoadMore} colorScheme="blue">
          Mostrar más
        </Button>
      )}
    </Center>
  );
};

export default MoreCards;