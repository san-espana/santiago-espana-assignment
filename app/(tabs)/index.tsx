import { Image, StyleSheet, Platform } from 'react-native';
import { useEffect } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton'
import { View } from 'react-native';
import authService from '../services/authService';
import useAuthStore from '../stores/authStore';

function HomeScreen() {
  const { user, logout } = useAuthStore();

  const handleLogIn = () => {
    console.log('Logging in...');
    authService.logInUser();
  };

  const handleLogOut = () => {
    console.log('Logging out...');
    logout();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      {user ? (
        <ThemedView style={styles.loggedInContainer}>
          <View style={styles.userInfo}>
            <ThemedText type="title">Welcome back, {user.firstname}!</ThemedText>
            <ThemedText type="subtitle">Let’s make today awesome!</ThemedText>
          </View>

          <View style={styles.dashboard}>
            <ThemedText type="subtitle">Today’s Highlights:</ThemedText>
            <ThemedText>Your Last Activity: {user.updated_at ? new Date(user.updated_at).toISOString().split('T')[0] : 'No activities yet!'}</ThemedText>
            <ThemedText>Hows the weather in {user.state ? user.state : user.country ? user. country : ""}?</ThemedText>
          </View>

          <View style={styles.quoteContainer}>
            <ThemedText type="subtitle">“It’s not the distance, it’s the journey.”</ThemedText>
          </View>

          <ThemedView style={styles.updates}>
            <ThemedText type="subtitle">What’s New:</ThemedText>
            <ThemedText>- Added features for activity analysis!</ThemedText>
            <ThemedText>- Fixed bugs with Strava API sync.</ThemedText>
          </ThemedView>

          <View style={styles.logOutButtonContainer}>
            <ThemedButton title="Log Out" onPress={handleLogOut} type="red" />
          </View>
        </ThemedView>
      ) : (
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome to my App!</ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">My name is Santiago España and this is my humble app</ThemedText>
            <ThemedText>
              Feel free to try out all the Strava Endpoints that I set up for you guys!
              I didn't know about expo until now and it's a wonder. This theme is amazing!
              The state is managed by Zustand and I'm using React Query as asked.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Authentication</ThemedText>
            <ThemedText>
              In order to proceed with the API testing, you'll need to log in using the Strava OAuth authentication method. So, whenever you are ready, hit the LogIn button below!
            </ThemedText>
            <ThemedButton title="Log In" onPress={handleLogIn} />
          </ThemedView>
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  loggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    marginBottom: 16,
    alignItems: 'center',
  },
  logOutButtonContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },dashboard: {
    marginVertical: 16,
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  quoteContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  updates: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
  },
  chart: {
    marginVertical: 16,
    alignSelf: 'stretch',
    height: 200,
  },
});

export default HomeScreen;
