import { Injectable } from '@nestjs/common';
import { Comment } from '../dto/comment.dto';
import { Posts } from '../dto/post.dto';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
    constructor(private readonly postsService: PostsService) {}

    async getComments(postId: number): Promise<Comment[]> {
        const posts = await this.postsService.getPosts();
        return posts[postId].comments;
    }

    async getComment(postId: number, commentId: number): Promise<Comment> {
        const posts = await this.postsService.getPosts();
        return posts[postId].comments[commentId];
    }

    async createComment(postId: number, data: Comment): Promise<Comment> {
        const posts = await this.postsService.getPosts();
        const comments = await posts[postId].comments;
        if (data.text) {
            data.id = comments.length + 1;
            data.createdAt = new Date(Date.now());
        }
        comments.push(data);

        return data;
    }

    async deleteComment(postId: number, commentId: number): Promise<Posts[]> {
        const posts = await this.postsService.getPosts();
        const post = posts[postId];
        const comment = post.comments[commentId];
        if (comment) {
            post.comments.splice(commentId, 1);
            return posts;
        } else throw new Error('Comment not found');
    }

    async updateComment(
        postId: number,
        commentId: number,
        data: Comment,
    ): Promise<Comment> {
        const posts = await this.postsService.getPosts();
        const post = posts[postId];
        const comment = post.comments[commentId];
        if (data.text) {
            let existingComment = comment;
            existingComment = {
                ...existingComment,
                ...data,
            };
            post.comments[commentId] = existingComment;
        }

        return posts[postId].comments[commentId];
    }
}
