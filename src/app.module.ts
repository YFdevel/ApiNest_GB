import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from './mail/mail.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import {MailController} from "./mail/mail.controller";
import {PostsController} from "./posts/posts.controller";
import {CommentsController} from "./comments/comments.controller";

@Module({
  imports: [PostsModule, CommentsModule, MailModule,ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..','public'),
  }),],
  controllers: [AppController,PostsController, CommentsController,MailController],
  providers: [AppService],
})
export class AppModule {}
