import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { BcryptServiceModule } from 'src/bcrypt-service/bcrypt-service.module';

@Module({
  imports:[UsersModule, BcryptServiceModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
