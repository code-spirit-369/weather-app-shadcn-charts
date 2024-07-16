"use client";

import { useWeatherData } from "@/hooks/useWeatherData";
import { TemperatureChart } from "./charts/temperature-chart";
import { HumidityChart } from "./charts/humidity-chart";
import { PrecipitationSumChart } from "./charts/precipitation-sum-chart";
import { PrecipitationProbabilityChart } from "./charts/precipitation-percentage-chart";

type Props = {
  lat: string;
  long: string;
};

export default function ChartPanel({ lat, long }: Props) {
  const {
    temperatureChartData,
    humidityChartData,
    precipitationSumChartData,
    precipitationProbabilityChartData,
    weatherCode,
    currentTemp,
    currentApparentTemp,
    currentHumidity,
    loading,
    error,
  } = useWeatherData(lat, long);

  return (
    <>
      <TemperatureChart
        temperatureChartData={temperatureChartData}
        currentTemp={currentTemp}
        currentApparentTemp={currentApparentTemp}
        weatherCode={weatherCode}
        loading={loading}
      />
      <div className="grid grid-cols-2 mt-4 gap-4">
        <PrecipitationSumChart
          precipitationSumChartData={precipitationSumChartData}
          loading={loading}
        />
        <PrecipitationProbabilityChart
          precipitationProbabilityChartData={precipitationProbabilityChartData}
          loading={loading}
        />
      </div>
      <HumidityChart
        humidityChartData={humidityChartData}
        currentHumidity={currentHumidity}
        loading={loading}
      />
    </>
  );
}
