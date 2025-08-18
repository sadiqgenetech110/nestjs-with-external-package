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


@Controller("firestore")
export class FirebaseFirestoreController {
  constructor(
    private readonly userService: UsersService) {}

  @Post("add/:collection")
  async addUser(
    @Param("collection") collection: string,
    @Body() data: any
  ): Promise<any> {
    return this.userService.addUser(collection, data);
  }

  @Get("get/:collection/:id")
  async getUser(
    @Param("collection") collection: string,
    @Param("id") id: string
  ): Promise<any> {
    return this.userService.getUser(collection, id);
  }

  @Put("update/:collection/:id")
  async updateUser(
    @Param("collection") collection: string,
    @Param("id") id: string,
    @Body() data: any
  ): Promise<any> {
    return this.userService.updateUser(collection, id, data);
  }

  @Delete("delete/:collection/:id")
  async deleteUser(
    @Param("collection") collection: string,
    @Param("id") id: string
  ): Promise<void> {
    return this.userService.deleteUser(collection, id);
  }

  @Get("all/:collection")
  async getAllUsers(
    @Param("collection") collection: string
  ): Promise<any[]> {
    return this.userService.getAllUsers(collection);
  }

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
}