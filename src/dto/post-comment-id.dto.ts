import { IsInt, IsNotEmpty } from 'class-validator';
export class PostCommentIdDto {
  @IsInt()
  @IsNotEmpty()
  postId!: number;

  @IsInt()
  @IsNotEmpty()
  commentId!: number;
}
