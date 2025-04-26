import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { BcryptServiceService } from 'src/auth-security/bcrypt-service.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly bcryptServiceService: BcryptServiceService,
        private readonly jwtService: JwtService
    ){}

    async register(registerDto: RegisterDto){
        
        const user = await this.usersService.findOneByEmail(registerDto.email);

        if (user) {
            throw new BadRequestException('El Email se encuentra registrado.');
        }

        registerDto.password = await this.bcryptServiceService.hashPassword(registerDto.password);
        
        return await this.usersService.create(registerDto);

    }

    async loging(loginDto: LoginDto){

        const user = await this.usersService.findOneByEmail(loginDto.email);
        
        if (!user) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const validPassword = await this.bcryptServiceService.comparePassword(loginDto.password ,user.password);

        if(!validPassword){
            throw new UnauthorizedException('Invalid credentials.');
        }

        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            user
        };

    }

}
