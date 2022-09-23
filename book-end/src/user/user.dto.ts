import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
export class AddUserDto {
  @ApiProperty({ example: 123 })
  id?: string;

  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'yangye@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'yangye' })
  @IsNotEmpty()
  username: string
}