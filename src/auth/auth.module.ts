import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { BcryptServiceModule } from 'src/auth-security/bcrypt-service.module';
import { AuthGuard } from './guard/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    UsersModule, 
    JwtModule.register({
      global: true,
      secret: 'CONCREDITO',
      signOptions: { expiresIn: '360s' },
    }),
    BcryptServiceModule, 
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard]
})

export class AuthModule {}
