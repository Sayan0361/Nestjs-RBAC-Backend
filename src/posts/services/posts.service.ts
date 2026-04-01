import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from 'src/auth/entities/user.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { FindPostsQueryDto } from '../dto/find-posts-query.dto';


@Injectable()
export class PostsService {
    private postListCacheKeys : Set<string> = new Set();

    constructor(
        @InjectRepository(PostEntity)
        private postsRepository : Repository<PostEntity>,

        @Inject(CACHE_MANAGER)
        private cacheManager : Cache
    ){}

    private generatePostsListCacheKey(query : FindPostsQueryDto) : string {
        const {
            page = 1,
            limit = 10,
            title
        } = query;

        return `posts_list_page${page}_limit${limit}_title${title || 'all'}`;
    }

    async findAll(): Promise<PostEntity[]> {
        return this.postsRepository.find({
            relations : ['authorName']
        });
    }

    async findOne(id: number) : Promise<PostEntity> {
        const singlePost = await this.postsRepository.findOne({
            where : { id },
            relations : ['authorName']
        });
        // NotFoundException() -> Nestjs built in exception
        if(!singlePost) throw new NotFoundException(`Post with this ID ${id} doesnt exist`);

        return singlePost;
    }

    async create(createPostData: CreatePostDto, user : UserEntity): Promise<PostEntity> {
        const newPost : PostEntity = this.postsRepository.create({
            title: createPostData.title,
            content: createPostData.content,
            authorName: user
        });

        return this.postsRepository.save(newPost);
    }

    async update(id: number, updatePostData: UpdatePostDto, user : UserEntity) : Promise<PostEntity> {
        const findPostToUpdate = await this.findOne(id);

        if(findPostToUpdate.authorName.id !== user.id && 
            user.role !== UserRole.ADMIN
        ) {
            throw new ForbiddenException(
                `You can only update your own posts`
            );
        }

        if(updatePostData.title){
            findPostToUpdate.title = updatePostData.title;
        }
        if(updatePostData.content){
            findPostToUpdate.content = updatePostData.content;
        }

        const updatedPost = await this.postsRepository.save(findPostToUpdate);
        return updatedPost;
    }

    async delete(id: number) : Promise<void> {
        const findPostToDelete = await this.findOne(id);

        await this.postsRepository.remove(findPostToDelete);
    }
}
