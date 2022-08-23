import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FeishuController } from './feishu/feishu.controller';
import { FeishuService } from './feishu/feishu.service';

@Module({
  controllers: [UserController, FeishuController],

  providers: [UserService, FeishuService],
})
export class UserModule { }
