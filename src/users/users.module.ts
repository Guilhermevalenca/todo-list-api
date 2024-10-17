import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@prismaService';
import { UsersResolver } from './users.resolver';
import { CryptoService } from '../crypt/crypto.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    UsersResolver,
    CryptoService,
    AuthService,
  ],
})
export class UsersModule {}
