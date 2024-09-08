"use client";
import React, { useCallback, useEffect } from "react";
import MetricPanel from "./MetricPanel";
import ChartDisplay from "./ChartDisplay";
import EmptyResponseContainer from "./EmptyResponseContainer";
import DeviceMetricsModal from "./DeviceMetricsModal";
import useChartData from "../hooks/useChartData";
import { useCampaign } from "../context/CampaignContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Campaign } from "../types";
import dynamic from "next/dynamic";

const ReportCanvas = dynamic(() => import('./ReportCanvas'), {
  ssr: false,
});

function ReportPanel({ data }: { data: Campaign[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const label = searchParams.get("selectedMetric");
  const metric = searchParams.get("selectedCategory");

  const { campaigns, setCampaigns, selectedMetrics, setMetrics, metrics, chartType, selectedDeviceType, setModalData } =
    useCampaign();

  useEffect(() => {
    setCampaigns(data);
    if (data.length > 0) {
      setMetrics(Object.keys(data[0].metrics)); // Initialize the available metrics
    }
  }, []);

  const updateModalData = useCallback(() => {
    if (!label || !metric) return;

    const clickedCampaign = campaigns.find((campaign) => campaign.name === label);
    if (!clickedCampaign) return;

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
  }, [campaigns, label, metric, router, searchParams]);

  useEffect(() => {
    updateModalData();
  }, [updateModalData]);

  const chartData = useChartData(selectedMetrics, campaigns, selectedDeviceType);

  return (
    <>
      <div className="flex flex-col md:flex-row h-full md:h-full">
        <MetricPanel />
        <div className=" mt-4 md:mt-0 md:ml-4 w-full h-[70%]">
          <ReportCanvas />
          {chartData ? <ChartDisplay data={chartData} /> : <EmptyResponseContainer />}
        </div>
      </div>
      <DeviceMetricsModal />
    </>
  );
}

export default ReportPanel;
