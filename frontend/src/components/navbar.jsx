import React from 'react';
import { Box, Flex, Image, HStack, Text } from '@chakra-ui/react';
import SortButton from './sortbutton';
import SearchEpisode from './searchepisode';

const Navbar = ({ handleSortChange, handleSearch }) => {
  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" bg="rgba(0, 0, 0, 0.5)" p={2} borderRadius="md" mb={4}>
      <Box display="flex" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="white">One Piece Online</Text>
        <Image src="/images/onepiecelogo.svg" alt="One Piece Logo" boxSize="80px" />
      </Box>
      <HStack spacing={4}>
        <SortButton onSortChange={handleSortChange} />
        <SearchEpisode onSearch={handleSearch} />
      </HStack>
    </Flex>
  );
};

export default Navbar;