import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";



export class LoginDto {

  @ApiProperty({type: 'string', example: 'admin@gmail.com', required: true})
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({type: 'string', example: 'admin', required: true})
  @IsString()
  password: string;
}