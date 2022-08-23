import { RECEIVE_TYPE, MSG_TYPE } from '@/helper/feishu/message'

import { ApiProperty } from '@nestjs/swagger'

export class FeishuMessageDto {
  @ApiProperty({ example: 'email' })
  receive_id_type: RECEIVE_TYPE
  @ApiProperty({ example: 'yangjie@feishu.com' })
  receive_id?: string

  @ApiProperty({ example: "{\"text\":\"你好我是飞书机器人\"}" })
  content?: string

  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  msg_type?: keyof MSG_TYPE

}