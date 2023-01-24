import cn from 'classnames'
import { FC } from 'react'

import styles from './AdminTable.module.scss'

const AdminTableHeader: FC<{ tabelItems: string[] }> = ({ tabelItems }) => {
	return (
		<div className={cn(styles.item, styles.itemHeader)}>
			{tabelItems.map((value) => (
				<div key={value}>{value}</div>
			))}
			<div>Actions</div>
		</div>
	)
}

export default AdminTableHeader
