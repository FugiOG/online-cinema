import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debouncedSeacrh = useDebounce(searchTerm, 500)

	const { isSuccess, data } = useQuery(
		['search movie list', debouncedSeacrh],
		() => MovieService.getAll(debouncedSeacrh),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSeacrh,
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return { isSuccess, data, handleSearch, searchTerm }
}
