import axios from 'axios';
import { Campaign } from '../types';

const API_BASE_URL = 'http://localhost:3001';

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await axios.get(`${API_BASE_URL}/campaigns`);
  return response.data;
};