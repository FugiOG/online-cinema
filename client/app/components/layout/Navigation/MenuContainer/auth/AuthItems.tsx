import React, { useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { getAdminHomeUrl } from '@/config/url.config'

import MenuItem from '../MenuItem'

import LogoutButton from './LogoutButton'

const AuthItems = () => {
	const { user: currentUser } = useAuth()
	const [user, setUser] = useState<any>(currentUser)

	useEffect(() => {
		setUser(currentUser)
	}, [currentUser])
	return (
		<>
			{user ? (
				<>
					<MenuItem
						item={{ icon: 'MdSettings', link: '/profile', title: 'Profile' }}
					/>
					<LogoutButton />
				</>
			) : (
				<MenuItem item={{ icon: 'MdLogin', link: '/auth', title: 'Login' }} />
			)}

			{user?.isAdmin && (
				<MenuItem
					item={{
						icon: 'MdOutlineLock',
						link: getAdminHomeUrl(),
						title: 'Admin panel',
					}}
				/>
			)}
		</>
	)
}

export default AuthItems
