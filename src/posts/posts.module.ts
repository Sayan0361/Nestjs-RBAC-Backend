import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity} from './entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    // this will register the PostEntity (injection) so that we can use it
    // this will be available in the current scope
    TypeOrmModule.forFeature([PostEntity]),
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
