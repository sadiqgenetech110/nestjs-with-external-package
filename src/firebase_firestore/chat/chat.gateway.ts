import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { ChatService } from './chat.service';
import { Bind, UseInterceptors } from '@nestjs/common';
import { MessageDto } from 'shared/src/message.dto';

@WebSocketGateway()
export class ChatGateway implements NestGateway {
  constructor(private chatService: ChatService) { }

  afterInit(server: any) {
    // console.log('Init', server);
  }

  handleConnection(socket: any) {
    const query = socket.handshake.query;
    console.log('Connect', query);
  }

  handleDisconnect(socket: any) {
    const query = socket.handshake.query;
    console.log('Disconnect', socket.handshake.query);
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(chat: MessageDto, sender: any) {
    console.log('New Chat', chat);
    sender.emit('newChat', chat);
    sender.broadcast.emit('newChat', chat);

  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: any) {
    client.join(data.roomId);
    console.log(`Client joined room ${data.roomId}`);
  }
  
  @SubscribeMessage('deleteMessage')
    handleDelete(@MessageBody() data: { roomId: string; messageId: string }, @ConnectedSocket() client: any) {
      // You’d also call your ChatService here to update Firestore...
      client.to(data.roomId).emit('messageDeleted', data);
      client.emit('messageDeleted', data); // echo to sender
    }

    @SubscribeMessage('updateMessage')
    handleUpdate(@MessageBody() data: { roomId: string; messageId: string; text: string }, @ConnectedSocket() client: any) {
      // Update Firestore...
      client.to(data.roomId).emit('messageUpdated', data);
      client.emit('messageUpdated', data); // echo back
    }
}