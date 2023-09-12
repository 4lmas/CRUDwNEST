/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from './profile.entity';
import { Post } from 'src/post/post.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[TypeOrmModule.forFeature([User, Profile, Post])],
  exports: [UsersService] 
})
export class UsersModule {}
