import { Module } from '@nestjs/common';
import { FirebaseFirestoreService } from './firebase_firestore.service';
import { FirebaseFirestoreController } from './firebase_firestore.controller';
import { FirebaseModule } from '../external/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [FirebaseFirestoreController],
  providers: [FirebaseFirestoreService],
})
export class FirebaseFirestoreModule {}