import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Render,
    Res
} from '@nestjs/common';
import {PostsService} from './posts.service';
import {Posts} from '../dto/post.dto';
import {DecrementQueryId} from '../utils/decrement-query-id.decorator';
import {DecrementBodyId} from '../utils/decrement-body-id.decorator';
import {DecrementParamId} from '../utils/decrement-param-id.decorator';
import {ParamIdDto} from '../dto/param-id.dto';
import {join} from 'path';
import {Response} from 'express';
import {createReadStream} from 'fs';
import {MailService} from "../mail/mail.service";


@Controller('posts')
export class PostsController {
    constructor(private readonly appService: PostsService) {
    }

    @Get('get-all')
    @Render('post-list')
    getAllPosts() {
        return this.appService.getPosts()
            .then((result)=>result?{posts:result}:{posts:[]})
    }

    @Get('get-one')
    async getPost(
        @Query() @DecrementQueryId(['id']) query: ParamIdDto,
    ): Promise<Posts> {
        return this.appService.getPost(query.id);
    }

    @Post('create')
    async createPost(@Body() data: Posts): Promise<Posts> {
        return this.appService.createPost(data);
    }

    @Delete('delete')
    async deletePost(
        @Body() @DecrementBodyId(['id']) body: ParamIdDto,
    ): Promise<Posts[]> {
        return this.appService.deletePost(body.id);
    }

    @Put('update')
    async updatePost(
        @Body() @DecrementBodyId(['id']) data: Posts,
    ): Promise<Posts> {
        return this.appService.updatePost(data);
    }

    @Get('/:id/detail')
    @Render('post-item')
    getPostDetails(@Param() @DecrementParamId(['id']) params: ParamIdDto) {
        return this.appService.getPost(params.id)
            .then((data)=>data?{result:data}:{result:null})
    }

    @Get('file')
    getFile(@Res() res: Response) {
        const file = createReadStream(join(process.cwd(), '/media/pexels.jpg'));
        file.pipe(res);
    }
}
