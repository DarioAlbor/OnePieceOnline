import React from 'react';
import { Flex } from '@chakra-ui/react';
import IndexPage from './pages/index';
import Footer from './components/footer';

function App() {
  return (
    <Flex direction="column" minH="100vh">
      <IndexPage />
      <Footer />
    </Flex>
  );
}

export default App;