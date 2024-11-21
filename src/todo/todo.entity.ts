import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '@prisma/client';

/**
 * This is mapped to the DB with migrations
 */

export class TodoEntity implements Todo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string;

  @ApiProperty({ required: false, default: 'John Doe' })
  author: string;

  @ApiProperty()
  completed: boolean;
}
