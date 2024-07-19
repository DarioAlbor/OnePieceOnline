import React from 'react';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Link,
  Image,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const SmallWithSocial = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      width="100%"
      mt="auto"
      py={8}
    >
      <Container
        as={Stack}
        maxW={'100%'}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
        textAlign={{ base: 'center', md: 'left' }}
        position="relative"
      >
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Github'} href={'https://github.com/DarioAlbor/OnePieceOnline'}>
            <FaGithub />
          </SocialButton>
        </Stack>
        <Stack spacing={0} align={{ base: 'center', md: 'center' }} flex={1}>
          <Text>
            © {currentYear} Este sitio no almacena ningún video en sus servidores. Todos los derechos a quién correspondan.
          </Text>
          <Text fontSize="sm">
            Agradecemos con mucho ❤️ a <Link href="https://www3.animeflv.net" isExternal>AnimeFLV</Link> por la utilización de sus servicios.
          </Text>
        </Stack>
        <Link href="https://www.vefixy.com" isExternal>
        <Image
          src="/images/vefixy.svg"
          alt="Vefixy Logo"
          boxSize="80px"
          objectFit="contain"
          position="absolute"
          right="20px"
          top="50%"
          transform="translateY(-50%)"
        />
        </Link>
      </Container>
    </Box>
  );
}

export default SmallWithSocial;