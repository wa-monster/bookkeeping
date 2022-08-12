import { Controller, Version, Get, Post, Body, Patch, Param, Delete, VERSION_NEUTRAL } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';
// Version标识这个接口的都是1.0版本的
@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) { }

  @Post()
  @Version([VERSION_NEUTRAL, '1'])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('getTestName')
  @Version([VERSION_NEUTRAL, '1'])
  getTestName() {
    console.log(123);

    return this.configService.get('TEST_VALUE').name;
  }

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll() {
    return this.userService.findAll();
  }
  @Get()
  @Version('2')
  findAll2() {
    return 'i am v2';
  }
  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findAll3() {
    const a: any = {}
    console.log(a.b.c)
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {}
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException("你这个参数错了")
    }
    return this.userService.findAll()

  }
}
