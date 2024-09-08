"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Campaign, ModalData } from "../types";

export const chartTypes = {
  Bar: "Bar",
  Line: "Line",
  Pie: "Pie",
} as const;

export interface CampaignContextType {
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  selectedMetrics: string[];
  setSelectedMetrics: React.Dispatch<React.SetStateAction<string[]>>;
  metrics: string[];
  setMetrics: React.Dispatch<React.SetStateAction<string[]>>;
  chartType: (typeof chartTypes)[keyof typeof chartTypes];
  setChartType: React.Dispatch<React.SetStateAction<(typeof chartTypes)[keyof typeof chartTypes]>>;
  selectedDeviceType: string | null;
  setSelectedDeviceType: React.Dispatch<React.SetStateAction<string | null>>;
  modalData: null | ModalData;
  setModalData: React.Dispatch<React.SetStateAction<ModalData | null>>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<string[]>([]);
  const [chartType, setChartType] = useState<(typeof chartTypes)[keyof typeof chartTypes]>(chartTypes.Bar);
  const [selectedDeviceType, setSelectedDeviceType] = useState<string | null>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        setCampaigns,
        selectedMetrics,
        setSelectedMetrics,
        metrics,
        setMetrics,
        chartType,
        setChartType,
        selectedDeviceType,
        setSelectedDeviceType,
        modalData,
        setModalData,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = (): CampaignContextType => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return context;
};
