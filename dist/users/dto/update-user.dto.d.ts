import { Roles } from '../../shared/enums/roles.enums';
export declare class UpdateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Roles;
}
