import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'shared/src/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   @Post()
    create(@Body() dto: CreateUserDto) {
      return dto;
    }
}
