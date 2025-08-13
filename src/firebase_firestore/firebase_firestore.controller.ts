import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { FirebaseFirestoreService } from "./firebase_firestore.service";
import { UsersService } from "./users/users.service";


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
}