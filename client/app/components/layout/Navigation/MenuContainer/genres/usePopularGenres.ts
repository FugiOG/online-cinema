import { useQuery } from 'react-query'

import { GenreService } from '@/services/genre.service'

import { getGenresUrl } from '@/config/api.config'

import { IMenuItem } from '../menu.interface'

export const usePopularGenres = () => {
	const queryData = useQuery('poular genre menu', () => GenreService.getAll(), {
		select: ({ data }) =>
			data
				.map(
					(genre) =>
						({
							icon: genre.icon,
							link: getGenresUrl(genre.slug),
							title: genre.name,
						} as IMenuItem)
				)
				.splice(0, 4),
	})

	return queryData
}
