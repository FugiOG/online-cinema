import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsEmail()
  readonly email: string
  @MinLength(6, { message: 'Password cannot be less then 6 characters' })
  @IsString()
  readonly password: string
}
