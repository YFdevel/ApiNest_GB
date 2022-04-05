import {Module} from '@nestjs/common';
import {CommentsController} from './comments.controller';
import {CommentsService} from './comments.service';
import {PostsController} from '../posts/posts.controller';
import {PostsModule} from '../posts/posts.module';


@Module({
    imports: [
        PostsModule,
    ],
    controllers: [PostsController],
    providers: [Array, CommentsService],
    exports: [CommentsService]
})
export class CommentsModule {
}
