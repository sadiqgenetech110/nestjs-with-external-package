import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FirebaseFirestoreModule } from './firebase_firestore/firebase_firestore.module';
import { FirebaseModule } from './external/firebase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // Make config globally available
    }),
    UsersModule, FirebaseFirestoreModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
