import { ProductResponseDTO } from '../product/product.interface';

export class OrderItemResponseDTO {
  id: string;
  price: number;
  product?: ProductResponseDTO;
}
