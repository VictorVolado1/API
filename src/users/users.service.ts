import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto) {

    const user = this.userRepository.create(createUserDto)
    return this.userRepository.save(user);

  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({email});
  }

}