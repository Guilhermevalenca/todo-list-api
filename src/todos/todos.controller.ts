import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo, User, UsersOnTodos } from '@prisma/client';
import { UsersOnTodosService } from '../users-on-todos/users-on-todos.service';
import { AuthGuard } from '@authGuard';
import { ZodValidationPipe } from '@zodValidation';
import createTodoValidation from './validation-schema/createTodoValidation';
import updateTodoValidation from './validation-schema/updateTodoValidation';
import {
  AddUserTodosGuard,
  RemoveUserTodosGuard,
} from '@src/todos/todos.guard';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly usersOnTodosService: UsersOnTodosService,
  ) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createTodoValidation))
  async store(
    @Body() data: { todo: Todo, users: User[] },
  ): Promise<Todo | null> {
    return this.todosService.create(data.todo, data.users);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(updateTodoValidation))
  async update(
    @Param('id') id: string,
    @Body() data: Todo,
  ): Promise<Todo | null> {
    return this.todosService.update(Number(id), data);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<Todo | null> {
    return this.todosService.delete(Number(id));
  }

  @Post('user/:id')
  @HttpCode(201)
  @UseGuards(AuthGuard, AddUserTodosGuard)
  async addUser(
    @Param('id') id: string,
    @Body() data: User,
  ): Promise<UsersOnTodos | null> {
    return this.usersOnTodosService.addUser(Number(id), data);
  }

  @Delete('user/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, RemoveUserTodosGuard)
  async removeUser(@Param('id') id: string): Promise<UsersOnTodos | null> {
    return this.usersOnTodosService.removeUser(Number(id));
  }
}
