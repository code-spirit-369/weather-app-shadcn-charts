"use client";

import { Activity, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  precipitationProbability: {
    label: "Precipitation Probability (%)",
    color: "#1E90FF",
    icon: Activity,
  },
} satisfies ChartConfig;

type Props = {
  precipitationProbabilityChartData: {
    date: string;
    precipitationProbability: number;
  }[];
  loading: boolean;
};

export function PrecipitationProbabilityChart({
  precipitationProbabilityChartData,
  loading,
}: Props) {
  if (loading) {
    return <ChartSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Precipitation Probability</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-32 lg:h-64 w-full">
          <AreaChart
            accessibilityLayer
            data={precipitationProbabilityChartData}
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="precipitationProbability"
              type="step"
              fill="var(--color-precipitationProbability)"
              fillOpacity={0.4}
              stroke="var(--color-precipitationProbability)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
