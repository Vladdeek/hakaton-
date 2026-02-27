import { useEffect, useState } from 'react'
import { DefaultInput } from '../components/Inputs'
import { DefaultButton, ToggleButton } from '../components/Buttons'
import { RegAPI, LoginAPI } from '../api/AuthorizationAPI'
import { useNavigate } from 'react-router-dom'

const Authorization = () => {
	const navigate = useNavigate()

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [passwordRepeat, setPasswordRepeat] = useState('')
	const [selected, setSelected] = useState(0)
	const option = [
		{
			id: 0,
			label: 'Авторизация',
			color: 'default',
		},

		{
			id: 1,
			label: 'Регистрация',
			color: 'default',
		},
	]

	const [error, setError] = useState('')
	const [steps, setStep] = useState([])
	const [passwordValid, setPasswordValid] = useState(false)
	const [passwordRepeatValid, setPasswordRepeatValid] = useState(false)
	const [loginValid, setLoginValid] = useState(false)

	useEffect(() => {
		const requirements = []

		const lengthValid = password.length >= 8
		const upperValid = /[A-Z]/.test(password)
		const digitValid = /\d/.test(password)

		if (!lengthValid) requirements.push('Минимум 8 символов')
		if (!upperValid) requirements.push('Заглавную букву')
		if (!digitValid) requirements.push('Цифру')

		let message = ''

		if (requirements.length > 0) {
			message = 'Пароль должен содержать:\n • ' + requirements.join('\n • ')
		}

		const repeatValid = passwordRepeat.length > 0 && password === passwordRepeat

		if (passwordRepeat && !repeatValid) {
			message += (message ? '\n\n' : '') + 'Пароли не совпадают'
		}

		setPasswordValid(lengthValid && upperValid && digitValid)
		setPasswordRepeatValid(repeatValid)
		setLoginValid(login.length > 0)

		setError(message)
	}, [password, passwordRepeat, login])

	const formValid =
		selected === 0
			? passwordValid && loginValid
			: passwordValid && passwordRepeatValid && loginValid

	const AuthorizationFunc = async () => {
		if (selected === 0) {
			try {
				const data = await LoginAPI({ login, password })
				navigate('/habits')
			} catch (e) {}
		} else if (selected === 1) {
			try {
				const data = await RegAPI({
					login,
					password,
					passwordRepeat,
				})
				navigate('/habits')
			} catch (e) {}
		}
	}

	useEffect(() => {
		selected === 0 && setPasswordRepeat('')
	}, [selected])

	return (
		<div className='w-full mt-35 flex flex-col gap-3 justify-center items-center p-4'>
			<ToggleButton option={option} onChange={setSelected} theme={'dark'} />
			<div className='flex flex-col gap-2 w-full mt-10'>
				<DefaultInput
					label='Логин'
					value={login}
					onChange={e => setLogin(e.target.value)}
					theme='light'
				/>
				<DefaultInput
					label='Пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
					theme='light'
					type='password'
				/>
				{selected === 1 && (
					<DefaultInput
						label='Повторите пароль'
						value={passwordRepeat}
						onChange={e => setPasswordRepeat(e.target.value)}
						theme='light'
						type='password'
					/>
				)}
			</div>

			<p className='text-red-500 font-light text-xs text-start flex flex-col h-15'>
				{selected === 1 &&
					error
						.split('\n')
						.flatMap((item, index) => (
							<span className={index === 0 && 'font-medium'}>{item}</span>
						))}
			</p>

			<div className='mt-5 w-full'>
				<DefaultButton
					title={selected === 0 ? 'Войти' : 'Зарегистрироваться'}
					onClick={AuthorizationFunc}
					disabled={!formValid}
				/>
			</div>
		</div>
	)
}
export default Authorization
