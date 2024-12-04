import { useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';

import * as Linking from 'expo-linking';
import  authService from '../services/authService'
import useAuthStore from '../stores/authStore'

export default function TokenSuccess() {
    const {
        user,
        token,
        refreshToken,
        setUser,
        setToken,
        setExpiration,
        setRefreshToken,
      } = useAuthStore();
      const router = useRouter()

      const handleLogIn = () => {        
        console.log('Logging in...');
        authService.logInUser();
      }
    
      const getResponseCode = async (): Promise<void> => {
        try {
          const url = await Linking.getInitialURL();
          if (!url) {
            console.error('No initial URL found');
            return;
          }
    
          const { queryParams } = Linking.parse(url) || {};
          const authorizationCode = Array.isArray(queryParams?.code)
            ? queryParams.code[0]
            : queryParams?.code;
    
          if (authorizationCode) {
            console.log("Fetching Token...")
            const response = await authService.exchangeCodeForToken(authorizationCode);
    
            if (response?.athlete) {
              console.log("Token fetched successfully!")
              setUser(response.athlete);
              setToken(response.access_token);
              setExpiration(response.expires_at);
              setRefreshToken(response.refresh_token);
            } else {
              console.error('Invalid response structure', response);
            }
          } else {
            console.error('Authorization code not found');
          }
        } catch (err) {
          console.error('Error:', err);
        }
      };
    
      const getNewToken = async (): Promise<void> => { 
        if (!refreshToken) {
            console.error("Refresh token is null. Redirecting to Home");
            router.push('/');
            return;
          }
        try {
            console.log("Refreshing Token...")
            const response = await authService.refreshExpiredToken(refreshToken);

         if (response && 'access_token' in response) {
            if(response.access_token === token){                
                console.log(`Token still fresh!`);
            } else{
                setToken(response.access_token);
                setExpiration(response.expires_at);
                setRefreshToken(response.refresh_token);
            }
         } else {
            console.error('Error refreshing token', response);
         }
        } catch (err) {
        console.error('Error during token refreshing:', err);
        }
    };

    useEffect(() => {    
        if(!token){
            getResponseCode()
        }
    }, [token]);
    
  
    return (
      <ThemedView style={styles.container}>
        {user ? (
          <>
            <ThemedText style={styles.mt} type="title">Welcome back, {user?.firstname}!</ThemedText>
            <ThemedText style={styles.mt} type="subtitle">Ready to crush your goals?</ThemedText>
    
            <Link href="/activities" style={styles.link}>
              <ThemedText type="link">Go check all the Activities!</ThemedText>
            </Link>
    
            <ThemedButton  
              title="Been idle for a while? Refresh your token here!" 
              onPress={getNewToken} 
              type="green" 
            />
          </>
        ) : (
          <>
            <ThemedText style={styles.mt}  type="title">Hello, Adventurer!</ThemedText>
              <ThemedText style={styles.mt} type="subtitle">Why log in?</ThemedText>
              <ThemedText style={styles.mt} type="subtitle">
              Log in to unlock your fitness journey with Strava.
            </ThemedText>
    
            <ThemedButton 
              title="Log In with Strava" 
              onPress={handleLogIn} 
              type="blue" 
              style={styles.mt} 
            />
    
            <ThemedView style={styles.aboutSection}>
              <ThemedText type="subtitle">Why log in?</ThemedText>
              <ThemedText style={styles.mt} >
                - Track your activities effortlessly.{"\n"}
                - Sync with your Strava data.{"\n"}
                - View your progress and achievements.
              </ThemedText>
            </ThemedView>
          </>
        )}
      </ThemedView>
    );    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  aboutSection: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
  },  
  mt: {
    marginTop: 20,
  }
});
