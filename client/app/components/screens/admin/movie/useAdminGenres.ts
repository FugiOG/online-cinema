import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/select/select.interface'

import { GenreService } from '@/services/genre.service'

import { toastError } from '@/utils/toast-error'

export const useAdminGenres = () => {
	const genreData = useQuery(['List of genre'], () => GenreService.getAll(), {
		select: ({ data }) =>
			data.map((genre): IOption => ({ value: genre._id, label: genre.name })),
		onError: (error) => {
			toastError(error, 'Get genre')
		},
	})

	return genreData
}
