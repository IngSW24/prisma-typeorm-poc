import { Injectable, NotImplementedException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * This implements the business logic. Since this is only
 * a CRUD interface, it uses the TypeORM repository to read/save/delete
 * data from the DB
 */

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll() {
    return this.todoRepository.find();
  }

  create(todo: Partial<Todo>) {
    return this.todoRepository.save(todo);
  }

  delete(id: string) {
    this.todoRepository.delete(id);
  }
}
