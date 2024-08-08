import { EGender } from '../../enum/gender.enum';

export interface IUserDetailResponse {
  id: number;
  phone: string;
  address: string;
  gender: EGender;
  image?: string;
}
