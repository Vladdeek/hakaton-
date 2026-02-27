import api, { API } from '../API'

export const CreateHabit = async data => {
	const res = await api.post(`${API}/habits/`, data)
	return res.data
}
export const GetUserHabits = async param => {
	const res = await api.get(`${API}/habits/users?tab=${param}`)
	return res.data
}
export const LogHabit = async habitID => {
	const res = await api.post(`${API}/habits/log/${habitID}`)
	return res.data
}
