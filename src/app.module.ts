import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@prismaService';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GroupsModule } from './groups/groups.module';
import { UsersOnGroupsService } from './users-on-groups/users-on-groups.service';
import { TodosModule } from './todos/todos.module';
import { UsersOnTodosService } from './users-on-todos/users-on-todos.service';
import { CryptoService } from './crypt/crypto.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    UsersModule,
    GroupsModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UsersOnGroupsService,
    UsersOnTodosService,
    CryptoService,
    AuthService,
    UsersService,
  ],
})
export class AppModule {}
