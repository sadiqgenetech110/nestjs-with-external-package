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


@Controller("firestore")
export class FirebaseFirestoreController {
  constructor(private readonly firestoreService: FirebaseFirestoreService) {}

  @Post("add/:collection")
  async addDocument(
    @Param("collection") collection: string,
    @Body() data: any
  ): Promise<any> {
    return this.firestoreService.addDocument(collection, data);
  }

  @Get("get/:collection/:id")
  async getDocument(
    @Param("collection") collection: string,
    @Param("id") id: string
  ): Promise<any> {
    return this.firestoreService.getDocument(collection, id);
  }

  @Put("update/:collection/:id")
  async updateDocument(
    @Param("collection") collection: string,
    @Param("id") id: string,
    @Body() data: any
  ): Promise<void> {
    return this.firestoreService.updateDocument(collection, id, data);
  }

  @Delete("delete/:collection/:id")
  async deleteDocument(
    @Param("collection") collection: string,
    @Param("id") id: string
  ): Promise<void> {
    return this.firestoreService.deleteDocument(collection, id);
  }

  @Get("all/:collection")
  async getAllDocuments(
    @Param("collection") collection: string
  ): Promise<any[]> {
    return this.firestoreService.getAllDocuments(collection);
  }
}