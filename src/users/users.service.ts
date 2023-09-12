/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto'; // The dto file is created to have control over what types of data will reach the user object
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
        )  {}

    //Define the type of data of user
    // isnt necesesary the use of the Promise but is recomended
    async CreateUser(user: CreateUserDto) {

        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })

        if (userFound) {
            return new HttpException("El usuario ya existe ", HttpStatus.BAD_REQUEST)
        }

        const newUser = this.userRepository.create(user)
        return await this.userRepository.save(newUser)
    };


    async GetUsers(): Promise<User[]>{
        return await this.userRepository.find();
    };

    async GetUserById(id: number) {
        return await this.userRepository.findOne({
            where: {
                id
            }
        })
    }

    async DeleteUser(id: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound){
            return new HttpException("User not found", HttpStatus.NOT_FOUND)
        }

        return await this.userRepository.delete({ id });
    }

    async UpdateUser(id: number, user: UpdateUserDto){
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if(!userFound) {
            return new HttpException("User not found ", HttpStatus.NOT_FOUND)
        }

        const updateUser = Object.assign(userFound, user);

        return await this.userRepository.save(updateUser)
    }

    async createProfile(id: number, profile: CreateProfileDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException("User not found ", HttpStatus.NOT_FOUND)
        }

        const newProfile = this.profileRepository.create(profile)
        const savedProfile = await this.profileRepository.save(newProfile)
        userFound.profile = savedProfile

        return this.userRepository.save(userFound)
    }
};