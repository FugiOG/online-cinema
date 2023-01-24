import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import Description from '../heading/Description'
import Heading from '../heading/Heading'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'
import GalleryItem from '../gallery/GalleryItem'
import { getMovieUrl } from '@/config/url.config'

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.description} />
			)}
            <section className={styles.movies}>
                {movies.map(movie => <GalleryItem key={movie._id} item={{
                    link: getMovieUrl(movie.slug), 
                    name: movie.title, 
                    posterPath: movie.bigPoster, 
                    content: {title: movie.title}}} variant='horizontal'/>)}
            </section>
		</Meta>
	)
}

export default Catalog
