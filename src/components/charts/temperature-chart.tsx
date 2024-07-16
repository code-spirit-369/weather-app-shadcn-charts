"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Image from "next/image";
import { weatherCodes } from "@/constants";
import { ChartSkeleton } from "./chart-skeleton";

const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "#FF6347",
  },
  apparent_temperature: {
    label: "Apparent Temperature (°C)",
    color: "#FFA500",
  },
} satisfies ChartConfig;

type Props = {
  temperatureChartData: {
    date: string;
    temperature: number;
    apparent_temperature: number;
  }[];
  currentTemp: number;
  currentApparentTemp: number;
  weatherCode: number;
  loading: boolean;
};

export function TemperatureChart({
  temperatureChartData,
  currentTemp,
  currentApparentTemp,
  weatherCode,
  loading,
}: Props) {
  if (loading) {
    return <ChartSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature</CardTitle>
        <div>
          <div className="flex items-center gap-x-2">
            <div className="text-muted-foreground">
              <p>Now</p>
              <p className="text-4xl font-bold">{currentTemp.toFixed(1)}°C</p>
            </div>
            <Image
              src={`https://www.weatherbit.io/static/img/icons/${weatherCodes[weatherCode].icon}.png`}
              alt={weatherCodes[weatherCode].label}
              width={75}
              height={75}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Feels like {currentApparentTemp.toFixed(1)}°C
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-32 lg:h-64 w-full">
          <AreaChart
            accessibilityLayer
            data={temperatureChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(date) => {
                const d = new Date(date);
                return d.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    });
                  }}
                />
              }
            />
            <defs>
              <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-temperature)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-temperature)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillApparentTemperature"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-apparent_temperature)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-apparent_temperature)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="apparent_temperature"
              type="natural"
              fill="url(#fillApparentTemperature)"
              fillOpacity={0.4}
              stroke="var(--color-apparent_temperature)"
              stackId="a"
            />
            <Area
              dataKey="temperature"
              type="natural"
              fill="url(#fillTemperature)"
              fillOpacity={0.4}
              stroke="var(--color-temperature)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
