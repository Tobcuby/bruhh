import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const TestConnection: React.FC = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(err => setError('Failed to connect to backend'));
  }, []);

  return (
    <Box p={4}>
      {message && <Text color="green.500">{message}</Text>}
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};

export default TestConnection; 