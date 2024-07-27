import { ProductResponseDTO } from '../product/product.dto';

export class OrderItemResponseDTO {
  id: string;
  price: number;
  product?: ProductResponseDTO;
}
