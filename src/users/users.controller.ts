/* eslint-disable prettier/prettier */
import { 
    Controller,
    Post, 
    Get, 
    Body, 
    Res, 
    HttpStatus, 
    Param,
    ParseIntPipe, 
    Delete,
    Patch
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { CreateProfileDto } from 'src/dto/create-profile.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    CreateUser(@Body() newUser: CreateUserDto, @Res() res) {
        try {
            this.usersService.CreateUser(newUser)
            res.status(HttpStatus.CREATED).json({ message: "Usuario creado esitosamente" })
        } catch (e) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ Error: `Ocurrio un error al crear usuario ${e}` })
        }
    }

    @Get()
    GetUsers(): Promise<User[]> {
        return this.usersService.GetUsers()
    }

    @Get(':id')
    GetUserById(@Param('id', ParseIntPipe) id: number, @Res() res): Promise<User>{
        try {
            id == null ? 
            res.state(HttpStatus.NOT_FOUND).json({message: "no se encontro el usuario: " + id}) :

            res.state(HttpStatus.ACCEPTED).json({ message: `Se ha eliminado ${id} exitosamente.`})
            return this.usersService.GetUserById(id);

        } catch (e) {
            console.error(`Error de servidor: ${e}`)
            res.state(HttpStatus.INTERNAL_SERVER_ERROR).json({Error: `server error: ${e}`})
        }
    }

    @Delete(':id')
    DeleteUser(@Param('id', ParseIntPipe) id: number){
        this.usersService.DeleteUser(id);
    }

    @Patch(':id')
    UpdateUser(@Param('id', ParseIntPipe) id:number, @Body() user: UpdateUserDto) {
        this.usersService.UpdateUser(id, user)
    }

    @Post(':id/profile')
    CreateProfile(@Param('id', ParseIntPipe) id:number, @Body() profile: CreateProfileDto){
        return this.usersService.createProfile(id, profile)
    }
}
