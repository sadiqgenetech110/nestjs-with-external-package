import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  recipientId: string; // the other user in a 1-to-1 chat

  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  mediaUrl?: string;

  @IsString()
  @IsIn(['text', 'image', 'video', 'file'])
  type: 'text' | 'image' | 'video' | 'file';
}
