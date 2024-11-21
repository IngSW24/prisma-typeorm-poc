import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

/**
 * Here the controller endpoints can be configured and exposed
 */

@ApiTags('Todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ type: TodoEntity, isArray: true })
  findAll() {
    return this.todoService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ type: TodoEntity })
  create(@Body() todo: CreateTodoDto) {
    return this.todoService.create(todo);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TodoEntity })
  delete(@Param('id') id: number) {
    return this.todoService.delete(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() todo: UpdateTodoDto) {
    return this.todoService.update(id, todo);
  }
}
