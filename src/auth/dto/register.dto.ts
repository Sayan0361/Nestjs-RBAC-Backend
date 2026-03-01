import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail({},{message: 'Please provide a valid email'})
    email!: string;

    @IsNotEmpty({message: 'Please provide name'})
    @IsString({ message: 'Name must be a string' })
    @MinLength(2, { message: 'Name must be atleast 2 characters long' })
    @MaxLength(50, { message: 'Name cannot be longer than 50 characters' })
    name!: string;

    @IsNotEmpty({message: 'Please provide Password'})
    @MinLength(4, { message: 'Password must be atleast 4 characters long' })
    @MaxLength(15, { message: 'Password cannot be longer than 15 characters' })
    password!: string;
}