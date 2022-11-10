import { FC } from 'react'
import ReduxToastrLib from 'react-redux-toastr'

const ReduxToast: FC = () => {
	return (
		<ReduxToastrLib
			newestOnTop={false}
			preventDuplicates
			progressBar
			closeOnToastrClick
			transitionIn="fadeIn"
			transitionOut="fadeOut"
			timeOut={4000}
		/>
	)
}

export default ReduxToast
