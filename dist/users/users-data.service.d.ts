import { CreateUserDto } from './dto/create-user.dto';
import { User } from './db/user.entity';
export declare class UsersDataService {
    addUser(newUser: CreateUserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
}
