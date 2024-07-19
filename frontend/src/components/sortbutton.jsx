import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { FaPlay } from "react-icons/fa";

const SortButton = ({ onSortChange }) => {
  const [sortOrder, setSortOrder] = useState('desc');

  const handleClick = () => {
    const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newSortOrder);
    onSortChange(newSortOrder);
  };

  return (
    <Button onClick={handleClick} leftIcon={<FaPlay />} px={6} py={4}>
      {sortOrder === 'desc' ? 'Mayor a menor' : 'Menor a mayor'}
    </Button>
  );
};

export default SortButton;