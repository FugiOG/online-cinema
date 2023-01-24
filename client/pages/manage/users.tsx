import { FC } from 'react'

import UserList from '@/components/screens/admin/users/userList'

import { NextPageAuth } from '@/shared/types/auth.types'

const UserListPage: NextPageAuth = () => {
	return <UserList />
}

UserListPage.isOnlyAdmin = true

export default UserListPage
