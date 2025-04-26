import { Module } from '@nestjs/common';
import { BcryptServiceService } from './bcrypt-service.service';

@Module({
  controllers: [],
  providers: [BcryptServiceService],
  exports: [BcryptServiceService]
})

export class BcryptServiceModule {}
