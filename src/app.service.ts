import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.model'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserUpdateDto } from './userUpdate.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel ('user') private readonly userModel: Model<UserDocument>
  ){}

  // creating a badge
  async createUser(user: User): Promise<User>{
    const newUser = new this.userModel(user)
    return newUser.save()
  }

  // reading the collection
  async readUser(){
    return this.userModel.find({})
    .then(user=>{return user})
    .catch((err)=>console.log(err))
  }

  // Reading a specific user by ID
  async readUserById(id: string) {
    return this.userModel
      .findById(id)
      .exec()
      .then((user) => {
        if (!user) {
          throw new Error('User not found'); 
        }
        return user;
      })
      .catch((err) => {
        throw new Error('An error occurred while fetching the user'); 
      });
  }

  //updating the data
  // async updateUser(id,data):Promise<User>{
  //   return this.userModel.findByIdAndUpdate(id,data,{new:true})
  // }

  //updating the data
  async updateUser(id: string, updateData: UserUpdateDto): Promise<User> {
    // Find the user by ID
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
  
    // Update the fields that are present in the updateData
    if (updateData.country) {
      user.country = updateData.country;
    }
    if (updateData.location) {
      user.location = updateData.location;
    }
    if (updateData.name) {
      user.name = updateData.name;
    }
  
    // Update the rating_scale fields if they exist in the updateData
    if (updateData.rating_scale) {
      if (updateData.rating_scale.rating_from !== undefined) {
        user.rating_scale.rating_from = updateData.rating_scale.rating_from;
      }
      if (updateData.rating_scale.rating_to !== undefined) {
        user.rating_scale.rating_to = updateData.rating_scale.rating_to;
      }
      if (updateData.rating_scale.description !== undefined) {
        user.rating_scale.description = updateData.rating_scale.description;
      }
      if (updateData.rating_scale.emblem_graphic_name !== undefined) {
        user.rating_scale.emblem_graphic_name = updateData.rating_scale.emblem_graphic_name;
      }
    }
  
    // Save the updated user
    const updatedUser = await user.save();
    return updatedUser;
  }

  //deleting the data
  async deleteUser(id){
    return this.userModel.findByIdAndRemove(id)
  }
}

