/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private usersService: UsersService
    ) {}

    async createPost(post: CreatePostDto){
        const userFound = await this.usersService.GetUserById(post.authorId)

        if (!userFound) {
            return new HttpException("User not found", HttpStatus.NOT_FOUND)
        }

        const newPost = this.postRepository.create(post)
        return this.postRepository.save(newPost)
    }
    getPost(){
        return this.postRepository.find();
    }
}