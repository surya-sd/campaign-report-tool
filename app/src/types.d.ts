import { Campaign } from "../types";
import {
  SET_CAMPAIGNS,
  SET_SELECTED_METRICS,
  SET_METRICS,
  SET_CHART_TYPE,
  SET_SELECTED_DEVICE_TYPE,
  SET_MODAL_DATA,
} from "./actionTypes";

export interface Campaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  metrics: Record<string, number>;
  deviceMetrics: {
    mobile?: Record<string, number>;
    desktop?: Record<string, number>;
    tablet?: Record<string, number>;
  };
  backgroundColor: string;
  borderColor: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    fill: boolean;
  }[];
}

export interface ChartDisplayProps {
  data: ChartData;
  type: string;
}

export interface MetricPanelProps {
  metric: string;
}

export interface ReportCanvasProps {
  selectedMetrics: string[];
}

export interface DeviceMetrics {
  mobile: number;
  desktop: number;
  tablet: number;
}

export interface ModalData {
  label: string;
  metric: string;
  deviceMetrics: DeviceMetrics;
}

export type ChartType = typeof chartTypes[keyof typeof chartTypes];

export interface CampaignState {
  campaigns: Campaign[];
  selectedMetrics: string[];
  metrics: string[];
  chartType: ChartType;
  selectedDeviceType: string | null;
  modalData: ModalData | null;
}

export type CampaignAction =
  | { type: typeof SET_CAMPAIGNS; payload: Campaign[] }
  | { type: typeof SET_SELECTED_METRICS; payload: string[] }
  | { type: typeof SET_METRICS; payload: string[] }
  | { type: typeof SET_CHART_TYPE; payload: ChartType }
  | { type: typeof SET_SELECTED_DEVICE_TYPE; payload: string | null }
  | { type: typeof SET_MODAL_DATA; payload: ModalData | null };