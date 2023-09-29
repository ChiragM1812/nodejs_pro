import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.model';
import { UserUpdateDto } from './userUpdate.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(@Body() userDto: User){
    return this.appService.createUser(userDto)
  }

  @Get()
  readUser(){
    return this.appService.readUser()
  }

  @Get(':id') 
  readOneUser(@Param('id') id: string){ 
    return this.appService.readUserById(id); 
  }

  @Put(':id')
  async updateUser(
    @Param('id') id:string ,
    @Body() updateData:UserUpdateDto
    ):Promise<User>{
    return this.appService.updateUser(id,updateData)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id:string){
    return this.appService.deleteUser(id)
  }
}

