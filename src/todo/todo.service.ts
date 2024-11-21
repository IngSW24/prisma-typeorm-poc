import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.todo.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  create(data: CreateTodoDto) {
    console.log('data is', data);
    return this.prismaService.todo.create({
      data,
    });
  }

  update(id: number, data: UpdateTodoDto) {
    return this.prismaService.todo.update({
      data,
      where: {
        id,
      },
    });
  }

  delete(id: number) {
    return this.prismaService.todo.delete({
      where: {
        id,
      },
    });
  }
}
