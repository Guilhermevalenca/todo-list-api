import { Test, TestingModule } from '@nestjs/testing';
import { UsersOnGroupsService } from './users-on-groups.service';

describe('UsersOnGroupsService', () => {
  let service: UsersOnGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersOnGroupsService],
    }).compile();

    service = module.get<UsersOnGroupsService>(UsersOnGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
