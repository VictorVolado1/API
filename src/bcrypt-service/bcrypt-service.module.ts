import { Module } from '@nestjs/common';
import { BcryptServiceService } from './bcrypt-service.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [BcryptServiceService],
  exports: [BcryptServiceService],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'CONCREDITO',
      signOptions: { expiresIn: '360s' },
    }),
  ]
})

export class BcryptServiceModule {}
