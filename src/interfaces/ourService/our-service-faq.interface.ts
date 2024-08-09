export interface IOurServiceFAQResponse {
  id: number;
  question: string;
  answer: string;
  service?: string;
}

export interface ICreateOurServiceFAQ {
  id?: number;
  question: string;
  answer: string;
}
