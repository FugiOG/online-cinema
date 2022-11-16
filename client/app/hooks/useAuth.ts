import { useEffect, useState } from 'react'

import { IInitialState } from '@/store/user/user.interface'

import { useTypedSelector } from './useTypedSelector'

// export const useAuth = () => {
// 	const currentUser = useTypedSelector((state) => state.user)
// const [user, setUser] = useState<any>(null)

// useEffect(() => {
// 	setUser(currentUser)
// }, [currentUser])

// 	return user
// }

export const useAuth = () => useTypedSelector((state) => state.user)
