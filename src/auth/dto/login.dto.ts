import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({},{message: 'Please provide a valid email'})
    email!: string;

    @IsNotEmpty({message: 'Please provide Password'})
    @MinLength(4, { message: 'Password must be atleast 4 characters long' })
    @MaxLength(15, { message: 'Password cannot be longer than 15 characters' })
    password!: string;
}