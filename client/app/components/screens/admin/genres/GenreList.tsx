import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import { NextPageAuth } from '@/shared/types/auth.types'

import Meta from '@/utils/meta/Meta'

import { useGenres } from './useGenres'

const GenreList: NextPageAuth = () => {
	const {
		handleSearch,
		searchTerm,
		isLoading,
		data,
		deleteAsync,
		createAsync,
	} = useGenres()

	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" />

			<AdminHeader
				heandleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				headerItems={['Name', 'Slug']}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default GenreList
