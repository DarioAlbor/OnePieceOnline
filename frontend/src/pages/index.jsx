import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Center, Spinner, Box, Icon, Text, VStack, Flex } from '@chakra-ui/react';
import CardAnimeContainer from '../components/cardanime';
import MoreCards from '../components/morecards';
import EpisodeModal from '../components/episodemodal';
import Navbar from '../components/navbar';
import { TbError404 } from "react-icons/tb";
import { useDisclosure } from '@chakra-ui/react';

const IndexPage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [displayedEpisodes, setDisplayedEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [episodeNumber, setEpisodeNumber] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchEpisodes = async (sortOrder = 'desc') => {
    try {
      const response = await axios.get('https://onepieceonline.onrender.com/get-one-piece-episodes', {
        params: { sortOrder }
      });
      setEpisodes(response.data);
      setDisplayedEpisodes(response.data.slice(0, 50));
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchEpisodes(sortOrder);
  }, [sortOrder]);

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setPage(1);
    setLoading(true);
    fetchEpisodes(newSortOrder);
  };

  const handleSearch = (episodeNumber) => {
    if (episodeNumber) {
      const episode = episodes.find(ep => parseInt(ep.episode.replace(/\D/g, '')) === parseInt(episodeNumber));
      if (episode) {
        setDisplayedEpisodes([episode]);
      } else {
        setDisplayedEpisodes([]);
      }
    } else {
      setDisplayedEpisodes(episodes.slice(0, 50 * page));
    }
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDisplayedEpisodes(episodes.slice(0, 50 * (page + 1)));
      setPage(prevPage => prevPage + 1);
      setLoadingMore(false);
    } catch (error) {
      setLoadingMore(false);
    }
  };

  const playEpisode = async (url, episode) => {
    try {
      setEpisodeNumber(episode);
      setSelectedEpisode(url);
      onOpen();
    } catch (error) {
      console.error('Error fetching iframe:', error);
    }
  };

  return (
    <Flex direction="column" flex="1" w="100%">
      <Box position="fixed" top="0" left="0" width="100%" zIndex="4">
        <Navbar handleSortChange={handleSortChange} handleSearch={handleSearch} />
      </Box>
      <Box flex="1" w="100%" mt="70px" mb="70px">
        {loading ? (
          <Center h="50vh">
            <Spinner size="xl" />
          </Center>
        ) : displayedEpisodes.length > 0 ? (
          <>
            <CardAnimeContainer animes={displayedEpisodes} onAnimeClick={playEpisode} />
            {displayedEpisodes.length > 1 && (
              <MoreCards onLoadMore={handleLoadMore} loading={loadingMore} />
            )}
          </>
        ) : (
          <Center flexDirection="column" mt={10}>
            <Icon as={TbError404} w={20} h={20} color="gray.500" />
            <Text fontSize="xl" mt={4} color="gray.500">No hay resultados para esta búsqueda</Text>
          </Center>
        )}
        {selectedEpisode && (
          <EpisodeModal
            isOpen={isOpen}
            onClose={onClose}
            selectedEpisode={selectedEpisode}
            episodeNumber={episodeNumber}
          />
        )}
      </Box>
    </Flex>
  );
};

export default IndexPage;