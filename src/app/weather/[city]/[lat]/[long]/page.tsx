import ChartPanel from "@/components/chart-panel";
import { SideInfopanel } from "@/components/side-infopanel";

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

export default function WeatherPage({ params: { city, lat, long } }: Props) {
  return (
    <div className="flex flex-col min-h-screen lg:flex-row gap-y-4 lg:gap-x-4">
      <SideInfopanel city={city} lat={lat} long={long} />
      <div className="flex-1 p-5 lg:p-10 space-y-4">
        <ChartPanel lat={lat} long={long} />
      </div>
    </div>
  );
}
