import { Roles } from '../../shared/enums/roles.enums';
export interface ExternalUserDto {
    id?: string;
    name: string;
    email: string;
    role: Roles;
}
