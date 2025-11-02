import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Box } from '@repo/ui';
import App from './App';

export default function Root() {
  return (
    <SafeAreaProvider>
      <Box className="dark flex-1">
        <App />
      </Box>
    </SafeAreaProvider>
  );
}

