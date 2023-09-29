import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin123@chiragcluster.lz2puyz.mongodb.net/nestjs-backend?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name: 'user', schema:UserSchema}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
