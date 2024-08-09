import { ICreateOurServiceFAQ } from "./our-service-faq.interface";
import { IOurServiceImageResponse } from "./our-service-image.interface";

export interface IOurServiceResponse {
  id?: number;
  title: string;
  subtitle: string;
  slug: string;
  icon: string;
  images?: IOurServiceImageResponse[];
}

export interface IOurServiceDetailResponse {
  id?: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  icon: string;
  keyPoints: string[];
  images: IOurServiceImageResponse[];
  faqs: ICreateOurServiceFAQ[];
}

export interface ICreateOurService {
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  icon?: string;
  faqs?: ICreateOurServiceFAQ[];
  keyPoints?: string[];
  images?: Express.Multer.File[];
}

export interface IUpdateOurService {
  title?: string;
  subtitle?: string;
  slug?: string;
  description?: string;
  icon?: string;
  addFaqs?: ICreateOurServiceFAQ[];
  deleteFaqs?: number[];
  keyPoints?: string[];
  addImages?: Express.Multer.File[];
  deleteImages?: number[];
}