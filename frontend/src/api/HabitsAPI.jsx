import api, { API } from '../API'

export const CreateHabit = async data => {
	const res = await api.post(`${API}/habits/`, data)
	return res.data
}
export const GetUserHabits = async () => {
	const res = await api.get(`${API}/habits/users/all`)
	return res.data
}
