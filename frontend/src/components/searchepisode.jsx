import React, { useState } from 'react';
import { InputGroup, InputLeftElement, InputRightElement, Input, IconButton, Box } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchEpisode = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSearchValue(value);
      if (value === '') {
        onSearch('');
      }
    }
  };

  const handleSearch = () => {
    if (searchValue) {
      onSearch(searchValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup maxW="300px" w="100%">
      <InputLeftElement pointerEvents="none">
      <Box as="span" color="gray.300">
  <img src="/images/onepiecelogo.svg" alt="Search Icon" style={{ width: '80px', height: '80px' }} />
</Box>
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Busca el número de episodio..."
        value={searchValue}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        borderRadius="full"
      />
      <InputRightElement>
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={handleSearch}
          borderRadius="full"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchEpisode;
