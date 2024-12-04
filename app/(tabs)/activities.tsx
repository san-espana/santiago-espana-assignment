import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { useColorScheme } from '@/hooks/useColorScheme';

import { useActivities, Activity } from '../services/activitiesService';
import { useLocalSearchParams, useRouter } from "expo-router";
import useAuthStore from '../stores/authStore';
import authService from '../services/authService'

export default function ActivitiesScreen() {
  const {token, user} = useAuthStore();
  const { data: activities, error, isLoading } = useActivities(token ?? "")
  const { month }  = useLocalSearchParams()
  const router = useRouter()
  const colorScheme = useColorScheme();

  const handleLogIn = () => {        
    console.log('Logging in...');
    authService.logInUser();
  }

  const mapSelectedActivities = (): Activity[] => {
    if(!activities) return []
    console.log("selectedActivities", month)
    return activities.filter((activity) => {
      const activityDate = new Date(activity.start_date);
      const activityMonth = `${activityDate.getFullYear()}-${activityDate.getMonth() + 1}`;
      return activityMonth === month;
    });
  };

  const removeMonthFilter = () =>{
    console.log("Loading back all activities...")
    router.push('/activities')
  }
  
  const displayData = month ? mapSelectedActivities() : activities

  if (isLoading) return <ThemedView style={{ flex: 1, padding: 16 }}><ThemedText type="title" style={{ marginBottom: 16 }}>Loading...</ThemedText></ThemedView>;
  if (error) return <ThemedView style={{ flex: 1, padding: 16 }}><ThemedText type="title" style={{ marginBottom: 16 }}>Error fetching activities.</ThemedText></ThemedView>;

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      {user ? (
      <ThemedView style={{ alignItems: 'center', marginBottom: 16 }}>
       <ThemedText type="title" style={{ marginRight: 8 }}>
          Recent Activities
        </ThemedText>
        {month && <ThemedButton style={{ marginTop: 10 }} title="Show all activities" onPress={removeMonthFilter} />}
      </ThemedView>
      ) : (
<>
        <ThemedText style={styles.mt} type="title">Hello, Adventurer!</ThemedText>
        <ThemedText style={styles.mt} type="subtitle">Your Activities Await!</ThemedText>
        <ThemedText style={styles.mt} type="subtitle">
          Log in to unlock your activities and track your fitness journey with Strava.
        </ThemedText>    
        
        <ThemedView style={styles.aboutSection}>
          <ThemedText type="subtitle">Why log in?</ThemedText>
          <ThemedText style={styles.mt}>
            - Track your personal activities{"\n"}
            - Sync your Strava data effortlessly{"\n"}
            - View your past performances and achievements
          </ThemedText>

          <ThemedButton 
          title="Log In with Strava" 
          onPress={handleLogIn} 
          type="blue" 
          style={styles.mt} 
        />
        </ThemedView>
      </>
      )}
      <FlatList
        data={displayData}
        key={`columns-${1}`}
        numColumns={1}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView
          style={{
            padding: 8,
            margin: '1%',
            borderRadius: 8,
            backgroundColor: colorScheme === 'dark' ? '#222222' : '#F0F4FF',
            alignItems: 'center',
          }}
          >
            <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
            <ThemedText>{new Date(item.start_date).toLocaleDateString()}</ThemedText>
            <ThemedText>Distance: {(item.distance / 1000).toFixed(2)} km</ThemedText>
            <ThemedText>Time: {Math.floor(item.moving_time / 60)} min</ThemedText>
            <ThemedText>Elevation: {item.total_elevation_gain} m</ThemedText>
          </ThemedView>
        )}
        />
    </ThemedView>
  );
}
const styles = StyleSheet.create({
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
    })