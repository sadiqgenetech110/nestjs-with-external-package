import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MessageDto {
  @ApiPropertyOptional({
    description: 'Room ID for group or chat room messages',
    example: 'room_12345',
  })
  @IsString()
  @IsOptional()
  roomID?: string;

  @ApiProperty({
    description: 'Sender user ID',
    example: 'user_1',
  })
  @IsNotEmpty()
  @IsString()
  senderId: string;

  @ApiProperty({
    description: 'Recipient user ID (for 1-to-1 chats)',
    example: 'user_2',
  })
  @IsNotEmpty()
  @IsString()
  recipientId: string;

  @ApiPropertyOptional({
    description: 'Message text (if type is text)',
    example: 'Hello, how are you?',
  })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiPropertyOptional({
    description: 'URL of media (if type is image, video, or file)',
    example: 'https://example.com/image.png',
  })
  @IsString()
  @IsOptional()
  mediaUrl?: string;

  @ApiProperty({
    description: 'Message type',
    example: 'text',
    enum: ['text', 'image', 'video', 'file'],
  })
  @IsString()
  @IsIn(['text', 'image', 'video', 'file'])
  type: 'text' | 'image' | 'video' | 'file';
}
