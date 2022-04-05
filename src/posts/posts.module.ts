import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {MailModule} from "../mail/mail.module";


@Module({
  imports:[MailModule],
  controllers: [PostsController],
  providers: [Array,PostsService],
  exports:[PostsService]
})
export class PostsModule {}
