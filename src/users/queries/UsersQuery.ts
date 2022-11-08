import { TextFilterType } from '../../shared/enums/textFilterType.enums';

export interface UsersQuery {
  name?: string;
  email?: string;
  emailFilterType?: TextFilterType;
  role?: string;
  sortField?: string;
  orderDirection?: 'DESC' | 'ASC';
}
