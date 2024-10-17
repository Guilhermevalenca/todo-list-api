import { Test, TestingModule } from '@nestjs/testing';
import { UsersOnTodosService } from './users-on-todos.service';

describe('UsersOnTodosService', () => {
  let service: UsersOnTodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersOnTodosService],
    }).compile();

    service = module.get<UsersOnTodosService>(UsersOnTodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
