import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from './decorators/user.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserModel } from './user.model'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return this.UserService.byId(_id)
  }

  @Get('profile/favorites')
  @Auth()
  async getFavourites(@User('_id') _id: Types.ObjectId) {
    return this.UserService.getFavouriteMovies(_id)
  }

  @Put('profile/favorites')
  @Auth()
  async toggleFavourites(
    @Body('movieId') movieId: Types.ObjectId,
    @User() user: UserModel
  ) {
    return this.UserService.toggleFavourite(movieId, user)
  }

  @Get()
  @HttpCode(200)
  @Auth('admin')
  async getUsers(@Query('searchTerm') searchTerm?: string) {
    return this.UserService.getAll(searchTerm)
  }
  @Get('count')
  @Auth('admin')
  async getCountUsers() {
    return this.UserService.getCount()
  }

  @Get(':id')
  @Auth('admin')
  async getUser(@Param('id', IdValidationPipe) id: string) {
    return this.UserService.byId(id)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    return this.UserService.delete(id)
  }

  @UsePipes(new ValidationPipe())
  @Put('profile')
  @HttpCode(200)
  @Auth()
  async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
    return this.UserService.updateProfile(_id, dto)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateUser(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateUserDto
  ) {
    return this.UserService.updateProfile(id, dto)
  }
}
