import { IPriceOptionResponse } from 'product/priceOption.interface';
import { PriceOption } from '../../../entities/product/priceOption.entity';

export const toIPriceOptionResponse = (
  entity: PriceOption,
): IPriceOptionResponse => {
  return {
    id: entity.id,
    title: entity.title,
    discount: entity.discount,
    discountType: entity.discountType,
    price: entity.price,
    totalPrice: entity.totalPrice,
    support_for: entity.support_for,
    keyPoints: entity.keyPoints,
    pricePer: entity.pricePer,
    serviceLink: entity.serviceLink,
  };
};
