import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

import { getGenreUrl } from '@/config/url.config'

import CollectionImage from './CollectionImage'
import { ICollection } from './Collections.interface'
import styles from './Collections.module.scss'

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link href={getGenreUrl(collection.slug)}>
			<a className={styles.collection}>
				<CollectionImage collection={collection} />

				<div className={styles.content}>
					<div className={styles.title}>{collection.title}</div>
				</div>

				<div className={cn(styles.behind, styles.second)}>
					<CollectionImage collection={collection} />
				</div>

				<div className={cn(styles.behind, styles.third)}>
					<CollectionImage collection={collection} />
				</div>
			</a>
		</Link>
	)
}

export default CollectionItem
