import React from 'react';
import { FlatList, View, StyleSheet  } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { useRouter } from "expo-router";
import authService from '../services/authService'
import useAuthStore from '../stores/authStore';
import { useActivities, Activity, MonthStat } from '../services/activitiesService';
import { useColorScheme } from '@/hooks/useColorScheme';
import MonthlyStatsChart from '@/components/MonthlyStatsChart'
import SingleMonthChart from '@/components/SingleMonthChart'

export default function MonthlyStatsScreen() {
  const {token, user} = useAuthStore();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { data: activities, error, isLoading } = useActivities(token ?? "")

  const handleLogIn = () => {        
    console.log('Logging in...');
    authService.logInUser();
  }

  const handleSelectMonth = (month:string) => {
    console.log(month)
    router.push(`/activities?month=${month}`);
  };
  
  const calculateMonthStats = (activities: Activity[]): MonthStat[] => {
    const monthStatsMap: { [key: string]: MonthStat } = {};
  
    activities.forEach((activity) => {
      const activityDate = new Date(activity.start_date);
      const monthKey = `${activityDate.getFullYear()}-${activityDate.getMonth() + 1}`;
  
      if (!monthStatsMap[monthKey]) {
        monthStatsMap[monthKey] = {
          month: monthKey,
          total_distance: 0,
          total_time: 0,
          total_elevation_gain: 0,
        };
      }
  
      monthStatsMap[monthKey].total_distance += activity.distance;
      monthStatsMap[monthKey].total_time += activity.moving_time;
      monthStatsMap[monthKey].total_elevation_gain += activity.total_elevation_gain;
    });
  
    return Object.values(monthStatsMap);
  };

  const monthlyStats = activities ? calculateMonthStats(activities) : [];
  const maxDistance = Math.max(...monthlyStats.map((stat) => stat.total_distance));
  
  if (isLoading) return <ThemedView style={{ flex: 1, padding: 16 }}><ThemedText type="title" style={{ marginBottom: 16 }}>Loading...</ThemedText></ThemedView>;
  if (error) return <ThemedView style={{ flex: 1, padding: 16 }}><ThemedText type="title" style={{ marginBottom: 16 }}>Error fetching monthly stats.</ThemedText></ThemedView>;

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
    {!user &&  (<>
      <ThemedText style={styles.mt} type="title">Hello, Adventurer!</ThemedText>
      <ThemedText style={styles.mt} type="subtitle">Get your Monthly Stats!</ThemedText>
      <ThemedText style={styles.mt} type="subtitle">
        Log in to see your detailed monthly statistics and progress over time.
      </ThemedText>

      <ThemedView style={styles.aboutSection}>
        <ThemedText type="subtitle">Why log in?</ThemedText>
        <ThemedText style={styles.mt}>
          - Analyze your performance over the month{"\n"}
          - Visualize your stats in graphs{"\n"}
          - See how far you've come in your fitness journey
        </ThemedText>
      <ThemedButton 
        title="Log In with Strava" 
        onPress={handleLogIn} 
        type="blue" 
        style={styles.mt} 
      />
      </ThemedView>

    </>)}
    {monthlyStats.length && <MonthlyStatsChart monthlyStats={monthlyStats} />}
   
    <FlatList
  data={monthlyStats}
  key={`columns-${3}`}
  keyExtractor={(item) => item.month.toString()}
  numColumns={3}
  renderItem={({ item }) => (
    <ThemedView
      style={{
        padding: 8,
        margin: '1%',
        width: '30%',
        borderRadius: 8,
        backgroundColor: colorScheme === 'dark' ? '#222222' : '#F0F4FF',
        flexDirection: 'row', 
        alignItems: 'flex-start',
        justifyContent: 'space-between', 
      }}
    >
      {/* Left: Graph */}
      <SingleMonthChart
        singleMonthData={item}
        maxDistance={maxDistance}
      />

      <View style={{ flex: 1, marginLeft: 20 }}>
        <ThemedText
          type="title"
          style={{
            fontSize: 22, 
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          {item.month}
        </ThemedText>
        <ThemedText style={{ marginBottom: 4 }}>
          Total Distance: {(item.total_distance / 1000).toFixed(2)} km
        </ThemedText>
        <ThemedText style={{ marginBottom: 4 }}>
          Total Time: {Math.floor(item.total_time / 60)} min
        </ThemedText>
        <ThemedText style={{ marginBottom: 4 }}>
          Total Elevation: {item.total_elevation_gain} m
        </ThemedText>
        <ThemedText
          onPress={() => handleSelectMonth(item.month)}
          style={{
            marginTop: 8,
            color: 'blue',
            fontWeight: 'bold',
          }}
        >
          View Activities
        </ThemedText>
      </View>
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