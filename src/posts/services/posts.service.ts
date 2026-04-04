import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from 'src/auth/entities/user.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { FindPostsQueryDto } from '../dto/find-posts-query.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';


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

    private async invalidateAllExistingCacheList(): Promise<void> {
        console.log(`Invalidating ${this.postListCacheKeys.size} cache list entries`);

        for (const key of this.postListCacheKeys) {
            await this.cacheManager.del(key);
        }
        
        this.postListCacheKeys.clear();
    }

    async findAll(query : FindPostsQueryDto): Promise<PaginatedResponse<PostEntity>> {
        const cacheKey = this.generatePostsListCacheKey(query);

        this.postListCacheKeys.add(cacheKey);

        const getCachedData = await this.cacheManager
                                .get<PaginatedResponse<PostEntity>>(cacheKey);

        if(getCachedData) {
            console.log(`Cache Hit --> Returning posts list from Cache ${cacheKey}`);
            return getCachedData;
        }

        console.log(`Cache Miss --> Returning posts list from database`);

        const {
            page = 1,
            limit = 10,
            title
        } = query;
        // If u are on 3rd page, then skip = (3 - 1) * 10 = 20
        // that means skip first 20 
        const skipPosts = ( page - 1 ) * limit; 

        const queryBuilder = this.postsRepository
                                .createQueryBuilder('post')
                                .leftJoinAndSelect('post.authorName', 'authorName')
                                .orderBy('post.createdDate', 'DESC')
                                .skip(skipPosts)
                                .take(limit);
        
        if(title) {
            queryBuilder.andWhere(
                'post.title ILIKE : title',
                { title : `%${title}%` }
            )
        }

        const [ items, totalItems ] = await queryBuilder.getManyAndCount();

        const totalPages = Math.ceil(totalItems/limit);

        const responseResult = {
            items,
            meta : {
                currentPage : page,
                itemsPerPage : limit,
                totalItems : totalItems,
                totalPages : totalPages,
                hasPreviousPage : page > 1,
                hasNextPage : page < totalPages
            }
        };

        const saveToCache = await this.cacheManager.set(cacheKey, responseResult, 30000);

        return responseResult;
    }

    async findOne(id: number) : Promise<PostEntity> {
        const cacheKey = `post_${id}`;
        const cachedPost = await this.cacheManager.get<PostEntity>(cacheKey);

        if(cachedPost) {
            console.log(`Cache Hit --> Returning post from Cache ${cacheKey}`);
            return cachedPost;
        }

        console.log(`Cache Miss --> Returning post from database`);

        const singlePost = await this.postsRepository.findOne({
            where : { id },
            relations : ['authorName']
        });
        // NotFoundException() -> Nestjs built in exception
        if(!singlePost) throw new NotFoundException(`Post with this ID ${id} doesnt exist`);

        //Store the post in cache
        const saveToCache = await this.cacheManager.set(cacheKey, singlePost, 30000);

        return singlePost;
    }

    async create(createPostData: CreatePostDto, user : UserEntity): Promise<PostEntity> {
        const newPost : PostEntity = this.postsRepository.create({
            title: createPostData.title,
            content: createPostData.content,
            authorName: user
        });

        // Invalidate the existing cache
        const invalidateCache = await this.invalidateAllExistingCacheList();

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

        const deletePostFromCache = await this.cacheManager.del(`post_${id}`);
        const invalidateCache = await this.invalidateAllExistingCacheList();

        return updatedPost;
    }

    async delete(id: number) : Promise<void> {
        const findPostToDelete = await this.findOne(id);

        const deletePostFromCache = await this.cacheManager.del(`post_${id}`);
        const invalidateCache = await this.invalidateAllExistingCacheList();

        await this.postsRepository.remove(findPostToDelete);
    }
}
