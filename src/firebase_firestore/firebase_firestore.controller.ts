import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { FirebaseFirestoreService } from "./firebase_firestore.service";
import { UsersService } from "./users/users.service";
import { createFileInterceptor } from "../external/fileUploadInterceptors";
import { CreateUserDto } from "shared/src/user.dto";
import { ChatMessageService } from "./chat-message/chat-message.service";
import { MessageDto } from "shared/src/message.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";


@Controller("firestore")
export class FirebaseFirestoreController {
  constructor(
    private readonly userService: UsersService,
    private readonly chatMessageService: ChatMessageService) {}

  @ApiTags('Users')  
  @ApiBody({ type: CreateUserDto })   
  @Post("add/:collection")
  async addUser(
    @Param("collection") collection: string,
    @Body() data: any
  ): Promise<any> {
    return this.userService.addUser(collection, data);
  }

  @ApiTags('Users')  
  @Get("get/:collection/:id")
  async getUser(
    @Param("collection") collection: string,
    @Param("id") id: string
  ): Promise<any> {
    return this.userService.getUser(collection, id);
  }

  @ApiTags('Users')
  @Put("update/:collection/:id")
  async updateUser(
    @Param("collection") collection: string,
    @Param("id") id: string,
    @Body() data: any
  ): Promise<any> {
    return this.userService.updateUser(collection, id, data);
  }

  @ApiTags('Users')
  @Delete("delete/:collection/:id")
  async deleteUser(
    @Param("collection") collection: string,
    @Param("id") id: string
  ): Promise<void> {
    return this.userService.deleteUser(collection, id);
  }

  @ApiTags('Users')
  @Get("all/:collection")
  async getAllUsers(
    @Param("collection") collection: string
  ): Promise<any[]> {
    return this.userService.getAllUsers(collection);
  }

  @ApiTags('Users')
  // Post media in gallery
  @Post('media')
  @UseInterceptors(
    createFileInterceptor(
      "gallery",
      "uploads",
      "profile",
      true,
    ),
  )
  async uploadGallery(
    @UploadedFiles() gallery?: Express.Multer.File[],
  ) {
    try {
      return gallery;
    } catch (error) {
      console.error('Error in updateMedia:', error);
      throw new HttpException(
        error.message || 'An error occurred while uploading the Media',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiTags('Users')
  // Signin
  @Post("signin/:collection")
  async signIn(
    @Param("collection") collection: string,
    @Body() data: CreateUserDto
  ): Promise<any> {
    return this.userService.signin(collection, data);
  }

  @ApiTags('Messages')
  // Send Message
  @Post('send')
  async sendMessage(@Body() dto: MessageDto) {
    return this.chatMessageService.sendMessage(dto);
  }

  @ApiTags('Messages')
  // Get Messages
  @Get('messages/:roomId')
  async getMessages(@Param('roomId') roomId: string) {
    return this.chatMessageService.getMessages(roomId);
  }

@ApiTags('Messages')
  // Get or create a chat room for 2 participants
@Get("room/:senderId/:receiverId")
async getOrCreateRoom(
  @Param("senderId") senderId: string,
  @Param("receiverId") receiverId: string
) {
  return this.chatMessageService.getOrCreateRoom(senderId, receiverId);
}


@ApiTags('Messages')
// Delete (soft delete) a message
@Put("messages/:roomId/:messageId/delete")
async softDeleteMessage(
  @Param("roomId") roomId: string,
  @Param("messageId") messageId: string,
) {
  return this.chatMessageService.softDeleteMessage(roomId, messageId);
}

@ApiTags('Messages')
// Update Message Text
@Put("messages/:roomId/:messageId")
async updateMessage(
  @Param("roomId") roomId: string,
  @Param("messageId") messageId: string,
  @Body() body: { text?: string; deletedAt?: number }
) {
  return this.chatMessageService.updateMessage(roomId, messageId, body);
}
}