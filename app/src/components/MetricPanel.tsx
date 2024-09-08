"use client";
import React from "react";
import { useCampaign } from "../context/CampaignContext";
import Metric from "./Metric";

const MetricPanel = () => {
  const { metrics } = useCampaign();
  
  return (
    <div className="bg-white p-4 rounded-md drop-shadow-lg md:h-1/2 min-w-[15%]">
      <h2 className="text-xl font-semibold mb-2">Metrics</h2>
      <div className="flex flex-row md:flex-col flex-wrap">
        {metrics?.map((metric) => (
          <Metric key={metric} metric={metric} />
        ))}
      </div>
    </div>
  );
};

export default MetricPanel;
