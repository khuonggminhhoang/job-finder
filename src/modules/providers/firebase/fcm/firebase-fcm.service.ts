import { OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Message } from 'firebase-admin/messaging';
import { config } from '@/config/config.service';
import { ServiceAccount } from 'firebase-admin';

export class FirebaseFcmService implements OnModuleInit {
  onModuleInit() {
    if (!admin.apps.length) {
      try {
        const serviceAccount: ServiceAccount = config.FCM;
        const credential = admin.credential.cert(serviceAccount);

        admin.initializeApp({
          credential,
          // databaseURL: ' опционально, если вы используете другие сервисы Firebase, такие как Realtime Database '
        });
        console.log('Firebase Admin SDK initialized successfully.');
      } catch (error) {
        console.error('Firebase Admin SDK initialization failed:', error);
      }
    } else {
      console.log('Firebase Admin SDK already initialized.');
    }
  }

  async sendPushNotificationToDevice(
    deviceToken: string,
    title: string,
    body: string,
    data?: { [key: string]: string },
  ): Promise<string> {
    data = {
      title: 'Test',
      body: 'Nội dung test',
    };
    const message: Message = {
      notification: { title, body },
      data,
      token: deviceToken,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log(`Successfully sent message: ${response}`);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}
