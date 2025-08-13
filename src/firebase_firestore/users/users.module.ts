import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseModule } from '../../external/firebase.module';

@Module({
  imports:[
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    FirebaseModule
  ],
  providers: [UsersService],
})
export class UsersModule {}
