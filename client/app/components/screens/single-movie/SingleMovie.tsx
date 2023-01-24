import dynamic from 'next/dynamic'
import { FC } from 'react'

import Banner from '@/components/ui/banner/Banner'
import Gallery from '@/components/ui/gallery/Gallery'
import SubHeading from '@/components/ui/heading/SubHeading'

import { IMovie } from '@/shared/types/movie.types'

import Meta from '@/utils/meta/Meta'

import { IMoviePage } from '../../../../pages/movie/[slug]'

import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'

const DynamicVideoPlayer = dynamic(
	() => import('@/ui/video-player/VideoPlayer'),
	{ ssr: false }
)

const DynamicRateMovie = dynamic(() => import('./RateMoive/RateMovie'), {
	ssr: false,
})

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie?.slug || '')
	return (
		<Meta title={movie?.title || ''} description={`Watch ${movie?.title}`}>
			<Banner
				image={movie?.bigPoster || ''}
				Detail={() => <Content movie={movie || ({} as IMovie)} />}
			/>

			<DynamicVideoPlayer
				slug={movie?.slug || ''}
				videoSource={movie?.videoUrl || ''}
			/>

			<div className="mt-12">
				<SubHeading title="Similar movies" />
				<Gallery items={similarMovies} />
			</div>

			<DynamicRateMovie id={movie?._id || ''} slug={movie?.slug || ''} />
		</Meta>
	)
}

export default SingleMovie
