import { IProductCategoryResponse } from "product/productCategory";
import { ProductCategory } from "../../../entities/product/productCategory.entity";

export const toIProductCategoryResponse = (
  entity: ProductCategory,
): IProductCategoryResponse => {
  return {
    id: entity.id,
    name: entity.name,
    color: entity.color,
    subtitle: entity.subtitle,
    icon: entity.icon,
    image: entity.image,
  };
};
