import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

export class Comment {
  @ValidateIf((o) => o.id)
  @IsPositive()
  @IsInt()
  id!: number | null;

  @ValidateIf((o) => o.text)
  @IsString()
  text!: string | null;

  @ValidateIf((o) => o.createdAt)
  @IsDate()
  createdAt!: Date | null;

  @ValidateIf((o) => o.avatar)
  @IsString()
  avatar!:string | null;
}
