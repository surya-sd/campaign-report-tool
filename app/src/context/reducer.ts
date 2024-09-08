import { CampaignAction, CampaignState } from "../types";
import {
  SET_CAMPAIGNS,
  SET_SELECTED_METRICS,
  SET_METRICS,
  SET_CHART_TYPE,
  SET_SELECTED_DEVICE_TYPE,
  SET_MODAL_DATA,
} from "./actionTypes";

export const initialState: CampaignState = {
  campaigns: [],
  selectedMetrics: [],
  metrics: [],
  chartType: "Bar",
  selectedDeviceType: null,
  modalData: null,
};

export const campaignReducer = (state: CampaignState = initialState, action: CampaignAction): CampaignState => {
  switch (action.type) {
    case SET_CAMPAIGNS:
      return { ...state, campaigns: action.payload };
    case SET_SELECTED_METRICS:
      console.log('SET_SELECTED_METRICS.payload--->', action.payload);
      return { ...state, selectedMetrics: action.payload };
    case SET_METRICS:
      console.log('SET_METRICS.payload--->', action.payload);
      return { ...state, metrics: action.payload };
    case SET_CHART_TYPE:
      return { ...state, chartType: action.payload };
    case SET_SELECTED_DEVICE_TYPE:
      return { ...state, selectedDeviceType: action.payload };
    case SET_MODAL_DATA:
      return { ...state, modalData: action.payload };
    default:
      return state;
  }
};