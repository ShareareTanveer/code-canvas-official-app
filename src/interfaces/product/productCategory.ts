export interface IProductCategoryResponse {
  id: number;
  name: string;
  color: string;
  subtitle?: string;
  icon: string;
  image: string;
}

export interface ICreateProductCategory {
  name: string;
  color: string;
  subtitle?: string;
  icon: string;
  image: string;
}

export interface IUpdateProductCategory {
  name?: string;
  color?: string;
  subtitle?: string;
  icon?: string;
  image?: string;
}
