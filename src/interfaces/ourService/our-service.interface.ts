import { ICategoryResponse } from 'category/category.interface';
import { ICreateOurServiceFAQ } from './our-service-faq.interface';
import { IOurServiceImageResponse } from './our-service-image.interface';

export interface IOurServiceResponse {
  id?: number;
  title: string;
  subtitle: string;
  slug: string;
  icon: string;
  price?: number;
  category?: ICategoryResponse;
  images?: IOurServiceImageResponse[];
}

export interface IOurServiceDetailResponse {
  id?: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  icon: string;  
  price?: number;
  content?: string;
  category?: ICategoryResponse;
  contentTitle?: string;
  keyPoints: string[];
  images: IOurServiceImageResponse[];
  faqs: ICreateOurServiceFAQ[];
  relatedServices?: IOurServiceResponse[];
}

export interface ICreateOurService {
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  icon?: string;
  price?: number;
  category?: number;
  content?: string;
  contentTitle?: string;
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
  price?: number;
  category?: number;
  content?: string;
  contentTitle?: string;
  addFaqs?: ICreateOurServiceFAQ[];
  deleteFaqs?: number[];
  keyPoints?: string[];
  addImages?: Express.Multer.File[];
  deleteImages?: number[];
}
