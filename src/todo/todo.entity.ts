import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * This is mapped to the DB with migrations
 */

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @Column({ default: 'John Doe' })
  @ApiProperty()
  author: string;

  @Column({ default: false })
  @ApiProperty()
  completed: boolean;
}
