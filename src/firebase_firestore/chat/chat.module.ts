import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  // controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
