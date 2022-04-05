import { IsInt, IsNotEmpty } from 'class-validator';
export class ParamIdDto {
  @IsInt()
  @IsNotEmpty()
  id!: number;
}
