import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, VStack, Spinner, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';

const EpisodeModal = ({ isOpen, onClose, selectedEpisode, episodeNumber }) => {
  const [iframeSrc, setIframeSrc] = useState('');
  const [loadingIframe, setLoadingIframe] = useState(false);

  useEffect(() => {
    const fetchInitialIframe = async () => {
      if (selectedEpisode) {
        try {
          setLoadingIframe(true);
          const response = await axios.get(`https://onepieceonline.onrender.com/get-iframe?url=${selectedEpisode}`);
          setIframeSrc(response.data.iframeSrc);
          setLoadingIframe(false);
        } catch (error) {
          setLoadingIframe(false);
        }
      }
    };

    fetchInitialIframe();
  }, [selectedEpisode]);

  const handleIframeChange = async (option) => {
    try {
      setLoadingIframe(true);
      const response = await axios.post('https://onepieceonline.onrender.com/fetch-iframe', {
        url: selectedEpisode,
        option
      });
      setIframeSrc(response.data.iframeSrc);
      setLoadingIframe(false);
    } catch (error) {
      setLoadingIframe(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{episodeNumber}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="blue">
                Opciones
              </MenuButton>
              <MenuList>
                {[1, 2, 3, 4, 5, 6, 7].map((option) => (
                  <MenuItem key={option} onClick={() => handleIframeChange(option)}>
                    Opción {option}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            {loadingIframe ? (
              <>
                <Spinner size="xl" />
                <p>Cargando episodio...</p>
              </>
            ) : (
              <iframe
                title="Episode Player"
                src={iframeSrc}
                width="100%"
                height="480px"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EpisodeModal;