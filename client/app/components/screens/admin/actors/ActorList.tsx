import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import { NextPageAuth } from '@/shared/types/auth.types'

import Meta from '@/utils/meta/Meta'

import { useActors } from './useActors'

const ActorList: NextPageAuth = () => {
	const {
		handleSearch,
		searchTerm,
		isLoading,
		data,
		deleteAsync,
		createAsync,
	} = useActors()

	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" />

			<AdminHeader
				heandleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				headerItems={['Name', 'Count movies']}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default ActorList
