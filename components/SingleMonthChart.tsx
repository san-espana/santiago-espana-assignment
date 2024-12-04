import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MonthStat } from '@/app/services/activitiesService';

interface SingleMonthChartProps {
  singleMonthData: MonthStat;
  maxDistance: number;
}

const SingleMonthChart: React.FC<SingleMonthChartProps> = ({ singleMonthData: monthData, maxDistance }) => {
  const colorScheme = useColorScheme();

  const currentDistances = [
    monthData.total_distance * 0.25,
    monthData.total_distance * 0.5,
    monthData.total_distance,
  ];

  const maxDistancePosition = currentDistances.length;

  const chartData = {
    labels: ['Start', 'Mid', 'End', 'Max'], 
    datasets: [
      {
        data: currentDistances,
        color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`, 
        strokeWidth: 2,
      },
      {
        data: Array(maxDistancePosition).fill(null).concat(maxDistance), 
        color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
        strokeWidth: 0,
        withDots: true,
      },
    ],
  };

  return (
    <View style={{ padding: 8 }}>
      <LineChart
        data={chartData}
        width={160} 
        height={100} 
        chartConfig={{
          backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
          backgroundGradientFrom: colorScheme === 'dark' ? '#222222' : '#F0F4FF',
          backgroundGradientTo: colorScheme === 'dark' ? '#222222' : '#F0F4FF',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`,
          labelColor: (opacity = 1) =>
            colorScheme === 'dark' ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`, 
          style: {
            borderRadius: 16,
          },
        }}
        verticalLabelRotation={0}
        fromZero={true}
        withVerticalLabels={true}
      />
    </View>
  );
};

export default SingleMonthChart;
