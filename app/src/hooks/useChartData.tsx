import { ChartData } from "../types";
import { useMemo } from "react";
import { Campaign } from "../types";

const useChartData = (selectedMetrics: string[], campaigns: Campaign[], deviceType: string | null): ChartData | null => {
  return useMemo(() => {
    if (selectedMetrics.length === 0 || campaigns.length === 0) {
      return null;
    }

    const labels = campaigns.map((campaign) => campaign.name);
    const backgroundColors = campaigns.map((campaign) => campaign.backgroundColor);
    const borderColors = campaigns.map((campaign) => campaign.borderColor);

    const datasets = selectedMetrics.map((metric) => ({
      label: metric,
      data: campaigns.map((campaign) => {
        if (deviceType && campaign.deviceMetrics[deviceType]) {
          return campaign.deviceMetrics[deviceType][metric];
        }
        return campaign.metrics[metric];
      }),
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1,
      fill: true,
    }));

    return {
      labels,
      datasets,
    } as ChartData;
  }, [selectedMetrics, campaigns, deviceType]);
};

export default useChartData;