import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const certPath = configService.get<string>('FIREBASE_CERTIFICATE');

        if (!certPath) {
          throw new Error('FIREBASE_CERTIFICATE env variable is not set');
        }

        const serviceAccount = require(path.resolve(certPath));

        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        }

        return admin.firestore();
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
