/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './posts.service';

@Controller('posts')
export class PostController {

    constructor(private postService: PostService){}

    @Post()
    CreatePost(@Body() post: CreatePostDto){
        return this.postService.createPost(post);
    }

    @Get()
    getPost(){
    return this.postService.getPost();
    }
}