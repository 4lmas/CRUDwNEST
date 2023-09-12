/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto'; // The dto file is created to have control over what types of data will reach the user object

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>)  {}

    //Define the type of data of user
    // isnt necesesary the use of the Promise but is recomended
    async createUser(user: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(user)
        return await this.userRepository.save(newUser)
    };

    async getUsers(): Promise<User[]>{
        return await this.userRepository.find();
    };

};