export interface ICategoryResponse {
  id: number;
  name: string;
}

export interface ICreateCategory {
  name: string;
}

export interface IUpdateCategory {
  name?: string;
}
