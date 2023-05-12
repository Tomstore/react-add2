import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from './user/reducer'
import logger from 'redux-logger'

const reducer = combineReducers({
	user: userReducer
})

const store = createStore(reducer, applyMiddleware(logger))

store.subscribe(() => {
	const state = store.getState();
	localStorage.setItem('token', state.user.token)
	localStorage.setItem('id', state.user.id)
	localStorage.setItem('avator', state.user.avator)
	localStorage.setItem('nickname', state.user.nickname)
	localStorage.setItem('permission_list', JSON.stringify(state.user.permission_list))
})

export type RootState = ReturnType<typeof store.getState>

export default store