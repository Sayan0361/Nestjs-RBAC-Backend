import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { PostExistsPipe } from '../pipes/post-exists.pipe';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostsThrottler } from '../guards/posts-throttler.guard';


@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {
    }

    // localhost:3000/posts
    // localhost:3000/posts?search=getting
    @Get()
    async findAll() : Promise<PostEntity[]> {
        return this.postsService.findAll();
    }

    // localhost:3000/posts/4
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe, PostExistsPipe) id: number) : Promise<PostEntity> {
        return this.postsService.findOne(id);
    }

    // localhost:3000/posts : POST request 
    // First u need to login as normal user and get the Access Token
    // createPostData = 
    // {
    //     "title": "Post data verification2",
    //     "content": "If your app is slow, users do not care how good your UI or logic is.",
    //     "authorName": "Sayan"
    // }
    @UseGuards(JwtAuthGuard)
    @UseGuards(PostsThrottler)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createPostData: CreatePostDto, @CurrentUser() currentUser: UserEntity) : Promise<PostEntity> {
        return this.postsService.create(createPostData, currentUser);
    }

    // localhost:3000/posts/1 : PUT request
    // updatePostData = 
    /**  
    {
        "title": "Update data verification2",
        "content": "If your app is slow, users do not care how good your UI or logic is."
    }
    */
    @UseGuards(JwtAuthGuard)
    @UseGuards(PostsThrottler)
    @Put(':id')
    async update(@Param('id', ParseIntPipe, PostExistsPipe) id: number, @Body() updatePostData:UpdatePostDto, @CurrentUser() currentUser: UserEntity): Promise<PostEntity> {
        return this.postsService.update(id, updatePostData, currentUser);
    }

    // localhost:3000/posts/1 : DELETE request
    @UseGuards(JwtAuthGuard)
    @UseGuards(PostsThrottler)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe, PostExistsPipe) id: number) : Promise<void> {
        this.postsService.delete(id);
    }
}
