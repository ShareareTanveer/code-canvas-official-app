import { IGenericPageSectionItemResponse } from './generic-page-section-item.interface';

export interface IGenericPageSectionResponse {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon?: string;
  image?: string;
  sectionName: string;
  keyPoints?: string[];
  items?: IGenericPageSectionItemResponse[];
}

export interface ICreateGenericPageSection {
  title: string;
  sectionName: string;
  subtitle: string;
  description: string;
  icon?: string;
  image?: string;
  keyPoints?: string[];
}

export interface IUpdateGenericPageSection {
  title?: string;
  sectionName?: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  image?: string;
  keyPoints?: string[];
}