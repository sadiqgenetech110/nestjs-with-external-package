import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseFirestoreController } from './firebase_firestore.controller';
import { FirebaseFirestoreService } from './firebase_firestore.service';

describe('FirebaseFirestoreController', () => {
  let controller: FirebaseFirestoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirebaseFirestoreController],
      providers: [FirebaseFirestoreService],
    }).compile();

    controller = module.get<FirebaseFirestoreController>(FirebaseFirestoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
