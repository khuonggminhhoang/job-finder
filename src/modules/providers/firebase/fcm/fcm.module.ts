import { Module } from '@nestjs/common';
import { FirebaseFcmService } from '@/modules/providers/firebase/fcm/firebase-fcm.service';

@Module({
  providers: [FirebaseFcmService],
  exports: [FirebaseFcmService],
})
export class FcmModule {}
