import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/databasee.module'
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers'
import { FeishuController } from './feishu/feishu.controller';
import { FeishuService } from './feishu/feishu.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [UserController, FeishuController],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService]
})
export class UserModule { }
