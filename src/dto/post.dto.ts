import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Comment } from './comment.dto';

export class Posts {
  @ValidateIf((o) => o.id)
  @IsInt()
  @IsPositive()
  id!: number;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @ValidateIf((o) => o.author)
  @IsString()
  author!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @ValidateIf((o) => o.createdAt)
  @IsDate()
  createdAt!: Date;

  @ValidateIf((o) => o.updatedAt)
  @IsDate()
  updatedAt!: Date;

  @ValidateIf((o) => o.comments)
  @IsArray()
  comments!: Comment[];
}
