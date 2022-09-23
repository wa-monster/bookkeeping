
import { Controller, Post, Body, Query, Get } from '@nestjs/common'

import { UserService } from './user.service';
import { AddUserDto } from './user.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { create } from 'domain';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }
  @ApiOperation({
    summary: '新增用户'
  })
  @Post('/add')
  create(@Body() user: AddUserDto) {
    return this.userService.createOrSave(user)
  }
}