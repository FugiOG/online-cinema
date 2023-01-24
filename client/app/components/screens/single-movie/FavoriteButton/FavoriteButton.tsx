import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { useAuth } from '@/hooks/useAuth'

import { UserService } from '@/services/user.service'

import { toastError } from '@/utils/toast-error'

import { useFavorites } from '../../favorites/useFavorites'

import styles from './FavoriteButton.module.scss'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)
	const { favoriteMovies, refetch } = useFavorites()

	useEffect(() => {
		if (!favoriteMovies) return

		const isHasMovie = favoriteMovies.some((f) => f._id === movieId)
		if (isHasMovie !== isSmashed) setIsSmashed(isHasMovie)
	}, [favoriteMovies, movieId, isSmashed])

	const { mutateAsync } = useMutation(
		'Update favorites',
		() => UserService.toggleFavorite(movieId),
		{
			onError: (error) => {
				toastError(error, 'Update favorite list')
			},
			onSuccess: () => {
				setIsSmashed(!isSmashed)
				refetch()
			},
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, { [styles.animate]: isSmashed })}
			style={{ backgroundImage: `url('/heart-animation.png')` }}
		/>
	)
}

export default FavoriteButton
