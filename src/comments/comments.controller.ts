import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query, Render,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { DecrementBodyId } from '../utils/decrement-body-id.decorator';
import { DecrementQueryId } from '../utils/decrement-query-id.decorator';
import { Comment } from '../dto/comment.dto';
import { Posts } from '../dto/post.dto';
import { CommentsService } from './comments.service';
import { PostCommentIdDto } from '../dto/post-comment-id.dto';
import { ParamIdDto } from '../dto/param-id.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileName, FileFilter } from '../utils/upload-img.utils';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get('/')
    @Render('show-comments')
    getComments(
        @Query() @DecrementQueryId(['id']) query: ParamIdDto){
        return this.commentsService.getComments(query.id)
            .then((data)=>data?{result:data}:{result:[]})
    }

    @Get('/get-one')
    async getComment(
        @Query()
        @DecrementQueryId(['postId', 'commentId'])
            query: PostCommentIdDto,
    ): Promise<Comment | null> {
        return this.commentsService.getComment(query.postId, query.commentId);
    }

    @Post('create')
    async createComment(
        @Query() @DecrementQueryId(['id']) query: ParamIdDto,
        @Body() data: Comment,
    ): Promise<Comment|null> {
        if(data.text){
            return this.commentsService.createComment(query.id, data);
        }
        return null;
    }

    @Delete('delete')
    async deleteComment(
        @Body()
        @DecrementBodyId(['postId', 'commentId'])
            body: PostCommentIdDto,
    ): Promise<Posts[]> {
        return this.commentsService.deleteComment(body.postId, body.commentId);
    }

    @Put('update')
    async updateComment(
        @Query()
        @DecrementQueryId(['postId', 'commentId'])
            query: PostCommentIdDto,
        @Body() data: Comment,
    ): Promise<Comment> {
        return this.commentsService.updateComment(
            query.postId,
            query.commentId,
            data,
        );
    }
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './public/uploads',
                filename: FileName,
            }),
            fileFilter: FileFilter,
        }),
    )
    async upload(
        @UploadedFile() file: Express.Multer.File,
        @Query() @DecrementQueryId(['id']) query: ParamIdDto,
        @Body() body: Comment,
    ) {
        console.log(file);

        body = {
            ...body,
            text: body.text,
            avatar: file.filename,
        };

        const data = await this.commentsService.createComment(query.id, body);
        return data;
    }

    @Get('create-comment')
    @Render('create-comment')
    createCommentRender( @Query() @DecrementQueryId(['id']) query: ParamIdDto) {
      return {
      showId:query.id+1};
    }
}
