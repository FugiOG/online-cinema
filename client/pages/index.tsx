import type { GetStaticProps, NextPage } from 'next'

import Home from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movies/getGenresList'

import { getActorUrl, getMovieUrl } from '@/config/url.config'

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Home slides={slides} actors={actors} trendingMovies={trendingMovies} />
	)
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()
		const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
			_id: m._id,
			bigPoster: m.bigPoster,
			link: getMovieUrl(m.slug),
			subTitle: getGenresList(m.genres),
			title: m.title,
		}))

		const { data: dataActors } = await ActorService.getAll()
		const actors: IGalleryItem[] = dataActors.slice(0, 7).map((a) => ({
			link: getActorUrl(a.slug),
			name: a.name,
			posterPath: a.photo,
			content: {
				title: a.name,
				subTitle: `+${a.countMovies} movies`,
			},
		}))

		const dataTrendingMovies = await MovieService.getMostPopularMovies()
		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 7)
			.map((m) => ({
				link: getMovieUrl(m.slug),
				name: m.title,
				posterPath: m.poster,
			}))

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
			revalidate: 60,
		}
	} catch (e) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: [],
			},
		}
	}
}
