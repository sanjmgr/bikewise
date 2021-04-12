import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Incident {
  id: number;
  title: string;
  description?: string;
  address: string;
  occurred_at: number;
  updated_at: number;
  url: string;
  source: Source;
  media: Media;
  location_type?: any;
  location_description?: any;
  type: string;
  type_properties?: any;
}

export interface Media {
  image_url?: string;
  image_url_thumb?: string;
}

export interface Source {
  name: string;
  html_url: string;
  api_url: string;
}

export interface PayloadProps {
  from: string;
  to: string;
  query: string;
  type: string;
  page: number;
}

export interface IncidentType {
  status: 'idle' | 'loading' | 'failed';
  incidents: Incident[];
  totalIncident: number;
  message: string;
}

export interface ApiResponse<T> extends AxiosResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

export interface IncidentById {
  incident: Incident;
  status: 'idle' | 'loading' | 'failed';
}
