import React from 'react';
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { View, LayoutChangeEvent  } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MonthStat } from "../app/services/activitiesService";


interface MonthStatChartProps {
  monthlyStats: MonthStat[];
}

const MonthlyStatsChart: React.FC<MonthStatChartProps> = ({ monthlyStats }) => {
  const [chartWidth, setChartWidth] = React.useState<number>(0);
  const colorScheme = useColorScheme();
  const barColor = colorScheme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(34, 202, 236, 1)';
  const labelColor = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const backgroundColor = colorScheme === 'dark' ? '#333' : '#fff';
  const gradientFrom = colorScheme === 'dark' ? '#222222' : '#F0F4FF';
  const gradientTo = colorScheme === 'dark' ? '#222222' : '#F0F4FF';

  const handleLayout = React.useCallback((event : LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setChartWidth(width);
  }, []);

  const data = monthlyStats.map(item => item.total_distance / 1000);
  const labels = monthlyStats.map(item => item.month);


  return (
    <ThemedView style={{ padding: 16, marginBottom: 16 }} onLayout={handleLayout}>
      <ThemedText type="title" style={{ marginBottom: 16 }}>Monthly Stats</ThemedText>
      <View style={{ flex: 1 }}>
        <BarChart
          data={{
            labels,
            datasets: [{
              data,
              color: (opacity = 1) => `${barColor}`, 
            }],
          }}
          width={chartWidth ? chartWidth- 32 : chartWidth}
          height={220}
          fromZero={true}
          yAxisLabel="Km"
          yAxisSuffix="km"
          chartConfig={{
            backgroundColor,
            backgroundGradientFrom: gradientFrom,
            backgroundGradientTo: gradientTo,
            decimalPlaces: 2,
            color: (opacity = 1) => `${barColor}`,
            labelColor: (opacity = 1) => `${labelColor}`,
            style: {
              borderRadius: 16,
            },
          }}
          verticalLabelRotation={30}
          yLabelsOffset={10}
        />
      </View>
    </ThemedView>
  );
};

export default MonthlyStatsChart;
