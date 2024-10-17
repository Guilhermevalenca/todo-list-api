import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Post,
  Put,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CryptoService } from '../crypt/crypto.service';
import { ZodValidationPipe } from '@zodValidation';
import createUserValidation from './validation-schema/createUserValidation';
import updateUserValidation from './validation-schema/updateUserValidation';
import loginUserValidation from './validation-schema/loginUserValidation';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@authGuard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return req.user;
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserValidation))
  async store(@Body() userData: User) {
    const data = {
      ...userData,
      password: this.cryptoService.encrypt(userData.password),
      confirmationPassword: undefined,
    };
    const user = await this.usersService.create(data);

    return {
      ...user,
      password: undefined,
    };
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(updateUserValidation))
  async update(@Request() req, @Body() userData: User): Promise<User | null> {
    return this.usersService.update(Number(req.user.id), userData);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async delete(@Request() req): Promise<User | null> {
    return this.usersService.delete(Number(req.user.id));
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(loginUserValidation))
  async login(@Body() data: User) {
    const user: User | null = await this.usersService.findEmail(data.email);

    if (!user)
      throw new HttpException(
        {
          error: 'Missing email or password',
        },
        401,
      );

    if (this.cryptoService.decrypt(user.password) !== data.password)
      throw new HttpException(
        {
          error: 'Missing email or password',
        },
        401,
      );

    const token = await this.authService.signIn(user.email, user.password);

    return {
      ...user,
      password: undefined,
      ...token,
    };
  }
}
