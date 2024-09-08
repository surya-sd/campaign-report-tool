"use client";
import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  ChartData,
} from "chart.js";
import { useCampaign } from "../context/CampaignContext";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Spinner from "./Spinner";

const CommonChart = dynamic(() => import('./CommonChart'), {
  ssr: false,
  loading: () => <Spinner /> ,
});


ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

interface ChartDisplayProps {
  data: ChartData;
}

const ChartDisplay = ({ data }:ChartDisplayProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { campaigns, setModalData } = useCampaign();

  const memoizedData = useMemo(() => data, [data]);

  const handleChartClick = (elements: any[], datasets: any[]) => {
    if (elements.length > 0) {
      const { index, datasetIndex } = elements[0];
      const label = data.labels[index];
      const metric = datasets[datasetIndex].label;

      const clickedCampaign = campaigns.find((campaign) => campaign.name === label); 
      if (clickedCampaign) {
        const deviceMetrics = {
          mobile: clickedCampaign.deviceMetrics?.mobile?.[metric] || 0,
          desktop: clickedCampaign.deviceMetrics?.desktop?.[metric] || 0,
          tablet: clickedCampaign.deviceMetrics?.tablet?.[metric] || 0,
        };
        setModalData({ label, metric, deviceMetrics });
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("selectedMetric", label);
        currentParams.set("selectedCategory", metric);
        router.replace(`?${currentParams.toString()}`);
      }
    }
  };

  return (
    <div className="w-full h-[70%] bg-white p-3 mt-4 rounded-md drop-shadow-md">
      <CommonChart data={memoizedData} onClick={handleChartClick} />
    </div>
  );
};

export default ChartDisplay;
