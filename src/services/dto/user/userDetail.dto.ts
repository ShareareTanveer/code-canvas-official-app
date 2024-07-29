import { EGender } from '../../../enum/gender.enum';

export class UserDetailResponseDTO {
  id: number;
  phone: string;
  address: string;
  gender: EGender;
  image?: string;
}
