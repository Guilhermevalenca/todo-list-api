import { Args, Query, Resolver } from '@nestjs/graphql';
import { TodosService } from './todos.service';

@Resolver('Todos')
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query()
  async todo(@Args('id') id: number) {
    return this.todosService.find(id);
  }

  @Query()
  async todos() {
    return this.todosService.all();
  }
}
