import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: string;

    @Prop()
    country: string;

    @Prop()
    location: string;

    @Prop()
    name: string;

    @Prop({
        type: {
            rating_from: Number,
            rating_to: Number,
            description: String,
            emblem_graphic_name: String,
        },
    })
    rating_scale: {
        rating_from: number;
        rating_to: number;
        description: string;
        emblem_graphic_name: string;
    };
}

export const UserSchema = SchemaFactory.createForClass(User);