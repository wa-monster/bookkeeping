import { RECEIVE_TYPE, MSG_TYPE } from '@/helper/feishu/message'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEnum } from 'class-validator'


export class FeishuMessageDto {
  @IsNotEmpty()
  @IsEnum(RECEIVE_TYPE)
  @ApiProperty({ example: 'email', enum: RECEIVE_TYPE })
  receive_id_type: RECEIVE_TYPE

  @IsNotEmpty()
  @ApiProperty({ example: 'yangjie@feishu.com' })
  receive_id?: string

  @IsNotEmpty()
  @ApiProperty({ example: "{\"text\":\"你好我是飞书机器人\"}" })
  content?: string

  @IsNotEmpty()
  @IsEnum(MSG_TYPE)
  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  msg_type?: keyof MSG_TYPE

}