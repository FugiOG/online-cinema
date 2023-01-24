import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import { NextPageAuth } from '@/shared/types/auth.types'

import Meta from '@/utils/meta/Meta'

import { useMovies } from './useMovies'

const MovieList: NextPageAuth = () => {
	const {
		handleSearch,
		searchTerm,
		isLoading,
		data,
		deleteAsync,
		createAsync,
	} = useMovies()

	return (
		<Meta title="Movies">
			<AdminNavigation />
			<Heading title="Movies" />

			<AdminHeader
				heandleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				headerItems={['Title', 'Genre', 'Rating']}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default MovieList
