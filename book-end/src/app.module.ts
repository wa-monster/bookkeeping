import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import PrismaModule from './prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
