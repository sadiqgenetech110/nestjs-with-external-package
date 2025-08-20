import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
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
  providers: [ChatMessageService],
})
export class ChatMessageModule {}
