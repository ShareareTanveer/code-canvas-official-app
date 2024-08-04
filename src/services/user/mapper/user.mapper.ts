import { User } from '../../../entities/user/user.entity';
import { SimpleUserResponseDTO } from '../../../services/dto/user/user.dto';

export const toUserResponseDTO = (
  entity: User,
): SimpleUserResponseDTO => {
  return {
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    email: entity.email,
    details: entity.details,
    role: entity.role,
    status: entity.status,
    customer: entity.customer,
  };
};
