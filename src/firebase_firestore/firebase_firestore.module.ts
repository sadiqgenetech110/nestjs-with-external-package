import { Module } from '@nestjs/common';
import { FirebaseFirestoreController } from './firebase_firestore.controller';
import { FirebaseModule } from '../external/firebase.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [FirebaseModule, UsersModule,
    JwtModule.register({
          secret: process.env.JWT_SECRET || 'secret',
          signOptions: { expiresIn: '1d' },
        }),
  ],
  controllers: [FirebaseFirestoreController],
  providers: [UsersService],
})
export class FirebaseFirestoreModule {}