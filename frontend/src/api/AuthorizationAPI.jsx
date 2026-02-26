import api, { API } from '../API'

export const LoginAPI = async ({ login, password }) => {
	const res = await api.post(`${API}/auth/login`, {
		username: login,
		password: password,
	})
	return res.data
}
export const RegAPI = async ({ login, password, passwordRepeat }) => {
	const res = await api.post(`${API}/auth/register`, {
		username: login,
		password: password,
		password_repeat: passwordRepeat,
	})
	return res.data
}
