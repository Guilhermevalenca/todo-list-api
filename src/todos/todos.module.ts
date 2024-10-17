import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosResolver } from './todos.resolver';
import { PrismaService } from '@prismaService';
import { UsersOnTodosService } from '../users-on-todos/users-on-todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodosResolver, PrismaService, UsersOnTodosService],
})
export class TodosModule {}
