export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

interface LoginSuccessAction {
	type: typeof LOGIN_SUCCESS
	payload: UserState
}

export function loginSuccessActionCreator(payload: UserState): LoginSuccessAction {
	return { type: LOGIN_SUCCESS, payload }
}

interface LoginFailAction {
	type: typeof LOGIN_FAIL
}

export function loginFailActionCreator(): LoginFailAction {
	return { type: LOGIN_FAIL }
}

export type UserAction = LoginFailAction | LoginSuccessAction


interface UserState {
	nickname: string
	avator: string
	token: string
	id: string
	permission_list: number[]
}

const initState: UserState = {
	nickname: localStorage.getItem('nickname') || '',
	avator: localStorage.getItem('avator') || '',
	token: localStorage.getItem('token') || '',
	id: localStorage.getItem('id') || '',
	permission_list: JSON.parse(localStorage.getItem('permission_list') || '[]')
}


const reducer = (state: UserState = initState, action: UserAction) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				...action.payload
			}
		case LOGIN_FAIL:
			return {
				...state,
				nickname: '',
				avator: '',
				token: '',
				permission_list: [],
				id: ''
			}
	}
	return state
}

export default reducer