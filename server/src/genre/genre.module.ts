import { Module } from '@nestjs/common'
import { GenreService } from './genre.service'
import { GenreController } from './genre.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { GenreModel } from './genre.model'
import { MovieModule } from 'src/movie/movie.module'

@Module({
  providers: [GenreService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: GenreModel,
        schemaOptions: {
          collection: 'Genre',
        },
      },
    ]),
    MovieModule,
  ],
  controllers: [GenreController],
})
export class GenreModule {}
