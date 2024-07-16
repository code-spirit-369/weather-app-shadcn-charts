"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartSkeleton } from "./chart-skeleton";

const chartConfig = {
  precipitation: {
    label: "Precipitation",
    color: "#1E90FF",
  },
} satisfies ChartConfig;

type Props = {
  precipitationSumChartData: {
    date: string;
    precipitation: string;
  }[];
  loading: boolean;
};

export function PrecipitationSumChart({
  precipitationSumChartData,
  loading,
}: Props) {
  if (loading) {
    return <ChartSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Precipitation Sum</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-32 lg:h-64 w-full">
          <BarChart accessibilityLayer data={precipitationSumChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="precipitation"
              fill="var(--color-precipitation)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
