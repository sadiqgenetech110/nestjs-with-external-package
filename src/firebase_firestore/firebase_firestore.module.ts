import { Module } from '@nestjs/common';
import { FirebaseFirestoreController } from './firebase_firestore.controller';
import { FirebaseModule } from '../external/firebase.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { ChatMessageService } from './chat-message/chat-message.service';

@Module({
  imports: [FirebaseModule, UsersModule,ChatMessageModule,
    JwtModule.register({
          secret: process.env.JWT_SECRET || 'secret',
          signOptions: { expiresIn: '1d' },
        }),
  ],
  controllers: [FirebaseFirestoreController],
  providers: [UsersService, ChatMessageService],
})
export class FirebaseFirestoreModule {}