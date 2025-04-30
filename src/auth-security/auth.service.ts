import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ){}

  async register(registerDto: RegisterDto) {

    const user = await this.usersService.findOneByEmail(registerDto.email);

    if (user) {
      throw new UnauthorizedException('El Email se encuentra registrado.');
    }

    registerDto.password = await this.hashPassword(registerDto.password);

    return await this.usersService.create(registerDto);
  }

  async loging({ email, password }: LoginDto) {
  
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const validPassword =  await this.comparePassword(
      password,
      user.password,
    );  

    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };

  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

}
