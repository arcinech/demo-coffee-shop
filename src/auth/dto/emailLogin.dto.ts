import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class EmailLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
