import { RootState } from './index'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

// 自定义 hooks 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 