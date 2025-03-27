import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  Spinner,
  Stack,
  theme
} from '@chakra-ui/react';

interface Prediction {
  points: number;
  rebounds: number;
  assists: number;
  points_rebounds: number;
}

function App() {
  const [playerId, setPlayerId] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [timeframe, setTimeframe] = useState<'last5' | 'season'>('last5');

  const fetchPredictions = async () => {
    if (!playerId) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/predictions/${playerId}?timeframe=${timeframe}`);
      const data = await response.json();
      
      if (response.ok) {
        setPredictions(data);
      } else {
        setError(data.error || 'Failed to fetch predictions');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl" py={10}>
        <Stack spacing={6}>
          <Heading as="h1" size="2xl" textAlign="center">
            Bruhh
          </Heading>
          
          <Box p={6} borderWidth={1} borderRadius="lg" bg="white" shadow="md">
            <Stack spacing={4}>
              <Input
                placeholder="Enter Player ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
              />
              <Button
                colorScheme="blue"
                onClick={fetchPredictions}
                disabled={!playerId || loading}
              >
                {loading ? <Spinner size="sm" /> : 'Get Predictions'}
              </Button>
            </Stack>
          </Box>

          <Box p={6} borderWidth={1} borderRadius="lg" bg="white" shadow="md">
            <Stack spacing={4}>
              <Heading size="md">
                {timeframe === 'last5' ? 'Last 5 Games' : 'Season Average'} Predictions
              </Heading>
              <Button 
                variant="outline" 
                onClick={() => setTimeframe(timeframe === 'last5' ? 'season' : 'last5')}
              >
                Switch to {timeframe === 'last5' ? 'Season Average' : 'Last 5 Games'}
              </Button>
              
              {error && <Text color="red.500">{error}</Text>}
              {predictions && (
                <Stack spacing={2}>
                  <Text>Points Prediction: {predictions.points.toFixed(1)}</Text>
                  <Text>Rebounds Prediction: {predictions.rebounds.toFixed(1)}</Text>
                  <Text>Points + Rebounds: {predictions.points_rebounds.toFixed(1)}</Text>
                  <Text>Assists: {predictions.assists.toFixed(1)}</Text>
                </Stack>
              )}
            </Stack>
          </Box>

          <Box p={6} borderWidth={1} borderRadius="lg" bg="white" shadow="md">
            <Heading size="md" mb={4}>AI Prop Builder</Heading>
            <Text>Smart prop combinations coming soon...</Text>
          </Box>
        </Stack>
      </Container>
    </ChakraProvider>
  );
}

export default App; 