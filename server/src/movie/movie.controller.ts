import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { GenreIdsDto } from './dto/genreIds.dto'
import { SlugDto } from './dto/slug.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { MovieService } from './movie.service'

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.movieService.bySlug(slug)
  }

  @Get('by-actor/:actorId')
  async byActor(@Param('actorId', IdValidationPipe) actorId: Types.ObjectId) {
    return this.movieService.byActor(actorId)
  }

  @UsePipes(new ValidationPipe())
  @Post('by-genre')
  @HttpCode(200)
  async byGenres(@Body() { genreIds }: GenreIdsDto) {
    return this.movieService.byGenres(genreIds)
  }

  @Get()
  @HttpCode(200)
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm)
  }

  @Get('most-popular')
  async getMostPopular() {
    return this.movieService.getMostPopular()
  }

  @UsePipes(new ValidationPipe())
  @Put('update-count-opened')
  @HttpCode(200)
  async updateCountOpened(@Body() { slug }: SlugDto) {
    return this.movieService.updateCountOpened(slug)
  }

  @Get(':id')
  @Auth('admin')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.movieService.byId(id)
  }

  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.movieService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateMovieDto
  ) {
    return this.movieService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.movieService.delete(id)
  }
}
