import { IsNotEmpty, IsOptional } from 'class-validator';
import { ProductResponseDTO } from '../product/product.interface';

export class CartResponseDTO {
  id: string;
  products: ProductResponseDTO[];
  totalPrice?: number;
}

export class AddToCartDTO {
  @IsNotEmpty()
  product: number;

  @IsOptional()
  cartId?: string;
}
