import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'shared/src/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

   @Post()
    create(@Body() dto: CreateUserDto) {
      const data = { email: dto.email, sub: dto.password };
      const payload = this.jwtService.sign(data);
      console.log("TOKEN is here", payload);
      return dto;
    }
}
