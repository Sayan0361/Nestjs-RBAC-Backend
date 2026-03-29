import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    @MinLength(3, { message: 'Title must be atleast 3 characters long' })
    @MaxLength(50, { message: 'Title cannot be longer than 50 characters' })
    title!: string;

    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be a string' })
    @MinLength(10, { message: 'Content must be atleast 10 characters long' })
    @MaxLength(500, { message: 'Content cannot be longer than 500 characters' })
    content!: string;

    // U will get the author details from Header : Bearer <AccessToken>
    // @IsNotEmpty({ message: 'Author is required' })
    // @IsString({ message: 'Author must be a string' })
    // @MinLength(3, { message: 'Author must be atleast 3 characters long' })
    // @MaxLength(100, { message: 'Author cannot be longer than 100 characters' })
    // authorName!: string;

}