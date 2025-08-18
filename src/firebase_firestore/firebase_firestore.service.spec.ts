import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseFirestoreService } from './firebase_firestore.service';

describe('FirebaseFirestoreService', () => {
  let service: FirebaseFirestoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseFirestoreService],
    }).compile();

    service = module.get<FirebaseFirestoreService>(FirebaseFirestoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
