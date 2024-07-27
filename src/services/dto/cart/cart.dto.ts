import { IsNotEmpty } from 'class-validator';
import { ProductResponseDTO } from '../product/product.dto';
import { SimpleUserResponseDTO } from '../user/user.dto';

export class CartResponseDTO {
  id: string;
  user: SimpleUserResponseDTO;
  products: ProductResponseDTO[];
  totalPrice?: number;
}

export class AddToCartDTO {
  @IsNotEmpty()
  product: number;
}
