import { User } from './user.entity';
export declare const UserRepository: import("typeorm").Repository<User> & {
    getUserByEmail(email: string): Promise<User>;
};
