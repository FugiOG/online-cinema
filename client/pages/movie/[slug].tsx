import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/components/screens/single-movie/SingleMovie'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import { getMovieUrl } from '@/config/url.config'

import Error404 from '../404'

export interface IMoviePage {
	movie: IMovie | undefined
	similarMovies: IGalleryItem[]
}
const MoviePage: NextPage<IMoviePage> = ({ movie, similarMovies }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies} />
	) : (
		<Error404 />
	)
}

export default MoviePage

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll()
		const paths = movies.map((a) => ({
			params: { slug: a.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (err) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug))
		const { data: dataSimilarMovies } = await MovieService.getByGenres(
			movie.genres.map((g) => g._id)
		)
		const similarMovies: IGalleryItem[] = dataSimilarMovies
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				link: getMovieUrl(m.slug),
				name: m.title,
				posterPath: m.poster,
			}))
		return {
			props: {
				movie,
				similarMovies,
			},
			revalidate: 60,
		}
	} catch (err) {
		return {
			notFound: true,
		}
	}
}
