/* eslint-disable prettier/prettier */
import { Controller,Post, Get, Body, Res, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post()
    createUser(@Body() newUser: CreateUserDto, @Res() res){
        try {
            this.usersService.createUser(newUser)
            res.status(HttpStatus.CREATED).json({ message: "Usuario creado esitosamente"})
        } catch (e){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ Error: `Ocurrio un error al crear usuario ${e}`})
        }
    }

    @Get()
    getUsers(){
        return this.usersService.getUsers()
    }
}
