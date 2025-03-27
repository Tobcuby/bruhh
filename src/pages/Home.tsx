import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import TestConnection from '../components/TestConnection';

const Home: React.FC = () => {
  return (
    <Box>
      <Heading mb={6}>Welcome to Bruhh</Heading>
      <TestConnection />
    </Box>
  );
};

export default Home; 