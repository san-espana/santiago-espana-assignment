import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

import useAuthStore from './stores/authStore';
import TokenHandler from '@/components/TokenHandler';
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

SplashScreen.preventAutoHideAsync();

 function RootLayout() {
   const { user, expiration, refreshToken } = useAuthStore();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
          {user && <StatusBar style="auto" /> }         
      </ThemeProvider>
      {expiration && refreshToken && <TokenHandler expiration={expiration} refreshToken={refreshToken} />}
    </QueryClientProvider>
  );
}

export default RootLayout;
