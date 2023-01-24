import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import { NextPageAuth } from '@/shared/types/auth.types'

import Meta from '@/utils/meta/Meta'

import { useUsers } from './useUsers'

const UserList: NextPageAuth = () => {
	const { handleSearch, searchTerm, isLoading, data, deleteAsync } = useUsers()

	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />

			<AdminHeader heandleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				headerItems={['Email', 'Date register']}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default UserList
