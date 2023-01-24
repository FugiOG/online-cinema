import { ChangeEvent, FC } from 'react'

import SearchField from '../../Search-field/SearchField'

import AdminCreateButton from './AdminCreateButton'
import styles from './AdminHeader.module.scss'

interface IAdminHeader {
	onClick?: () => void
	searchTerm: string
	heandleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({
	heandleSearch,
	searchTerm,
	onClick,
}) => {
	return (
		<div className={styles.header}>
			<SearchField handleSearch={heandleSearch} searchTerm={searchTerm} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</div>
	)
}

export default AdminHeader
