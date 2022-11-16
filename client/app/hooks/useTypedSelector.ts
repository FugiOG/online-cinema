import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { TaypeRootState } from '@/store/store'

export const useTypedSelector: TypedUseSelectorHook<TaypeRootState> =
	useSelector
