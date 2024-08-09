import { IGenericPageSectionResponse } from "./generic-page-section.interface";

export interface IGenericPageSectionItemResponse {
  id: number;
  title: string;
  subtitle: string;
  keyPoints: string[];
  description?: string;
  icon?: string;
  image?: string;
  genericPageSection?: IGenericPageSectionResponse;
}

export interface ICreateGenericPageSectionItem {
  title: string;
  subtitle: string;
  keyPoints?: string[];
  description?: string;
  icon?: string;
  image?: string;
  genericPageSection: number;
}

export interface IUpdateGenericPageSectionItem {
  title?: string;
  subtitle?: string;
  keyPoints?: string[];
  description?: string;
  icon?: string;
  image?: string;
  genericPageSection?: number;
}