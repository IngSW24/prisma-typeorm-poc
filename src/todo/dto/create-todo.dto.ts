import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, default: 'John Doe' })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  completed: boolean = false;
}
