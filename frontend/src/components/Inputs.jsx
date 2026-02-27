import {
	Apple,
	BedSingle,
	BicepsFlexed,
	BookOpen,
	Brain,
	Bubbles,
	Cigarette,
	CigaretteOff,
	Circle,
	Clock,
	Coffee,
	Dumbbell,
	Eye,
	EyeClosed,
	Flame,
	Gamepad,
	Heart,
	Minus,
	Music,
	Pill,
	Plus,
	ScrollText,
	Shield,
	ShoppingBag,
	Smartphone,
	Square,
	SunMedium,
	Target,
	Trash,
	Triangle,
	Wine,
	Zap,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { initialIcons } from '../data/icons'

export const DefaultInput = ({
	label,
	value,
	onChange,
	type = 'text',
	disabled = false,
}) => {
	const [isFocus, setIsFocus] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	return (
		<div className='relative w-full h-fit mt-5'>
			{/* Input */}
			<input
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
				value={value}
				onChange={onChange}
				disabled={disabled}
				className='
			peer
			w-full h-11 px-3
			rounded-lg
			text-[var(--secondary)]
			bg-[var(--middle-bg)]
			outline-none
			transition-all duration-200
			shadow-inner
			disabled:opacity-50
		'
			/>

			{/* Label */}
			{label && (
				<label
					className={`absolute  -translate-y-1/2 font-normal transition-all duration-200 pointer-events-none ${isFocus || value ? `-top-2.5 left-1 text-[var(--secondary)] text-sm` : `left-3 top-1/2 text-[var(--middle-secondary)] text-md`}`}
				>
					{label}
				</label>
			)}
			{type === 'password' && (
				<div
					onClick={() => setShowPassword(prev => !prev)}
					className='absolute top-0 h-11 right-3 flex justify-center items-center text-[var(--middle-secondary)]'
				>
					{showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
				</div>
			)}
		</div>
	)
}

export const WeekDayInput = ({ disabled, onChange }) => {
	const colors = [
		'green',
		'yellow',
		'red',
		'blue',
		'purple',
		'pink',
		'orange',
		'cyan',
		'indigo',
		'teal',
	]

	// перемешивание массива (Fisher–Yates)
	const shuffle = arr => {
		const copy = [...arr]
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[copy[i], copy[j]] = [copy[j], copy[i]]
		}
		return copy
	}

	const shuffledColors = shuffle(colors)

	const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

	const [days, setDays] = useState(() =>
		weekDays.reduce((acc, label, index) => {
			acc[index] = {
				label,
				active: true,
				color: shuffledColors[index % shuffledColors.length],
			}
			return acc
		}, {}),
	)
	const activeDays = useMemo(
		() =>
			Object.keys(days)
				.filter(key => days[key].active)
				.map(Number),
		[days],
	)

	useEffect(() => {
		onChange?.(activeDays)
	}, [activeDays])

	return (
		<div
			className={`flex flex-col relative gap-1 p-2 rounded-2xl shadow-sm border border-[var(--bg-border)] overflow-hidden ${disabled && 'opacity-50'}`}
		>
			<p className='font-medium text-center text-[var(--middle-secondary)]'>
				Дни выполнения привычки
			</p>
			{disabled && (
				<div className='absolute bg-[#00000025] font-medium text-2xl text-center text-white top-0 left-0 z-15 w-full h-full flex items-center justify-center'></div>
			)}

			<div className='flex items-center w-full justify-between gap-1'>
				{Object.entries(days).map(([key, value]) => (
					<p
						key={key}
						disabled={disabled}
						onClick={() =>
							setDays(prev => ({
								...prev,
								[key]: {
									...prev[key],
									active: !prev[key].active,
								},
							}))
						}
						style={{
							filter:
								value.active &&
								`drop-shadow(1px 2px 3px var(--${value.color}-shadow))`,
							backgroundColor: value.active
								? `var(--${value.color}-bg)`
								: 'var(--middle-bg)',
							color: value.active
								? `var(--${value.color}-text)`
								: 'var(--middle-secondary)',
						}}
						className={`flex justify-center items-center rounded-full font-semibold aspect-square h-auto w-1/7 transition-all ${
							!value.active && 'shadow-inner'
						}`}
					>
						{value.label}
					</p>
				))}
			</div>

			<p className='font-light text-sm text-center text-[var(--middle-secondary)]'>
				Выберите дни недели, в которые нужно отслеживать выполнение привычки.
				Например, для пробежек можно настроить тренировки на Пн, Ср и Пт
				<span className='font-semibold'> (автоматически выбраны все)</span>.
			</p>
		</div>
	)
}

export const IconInput = ({ onChange }) => {
	const colors = [
		'green',
		'yellow',
		'red',
		'blue',
		'purple',
		'pink',
		'orange',
		'cyan',
		'indigo',
		'teal',
	]

	// перемешивание массива (Fisher–Yates)
	const shuffle = arr => {
		const copy = [...arr]
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[copy[i], copy[j]] = [copy[j], copy[i]]
		}
		return copy
	}

	const shuffledColors = useMemo(() => shuffle(colors), [])

	const [selected, setSelected] = useState(null)
	const [selectedColor, setSelectedColor] = useState(null)

	const icons = useMemo(() => {
		return initialIcons.reduce((acc, item, index) => {
			acc[index] = {
				name: item.name,
				icon_path: item.icon_path,
				color:
					selectedColor !== null
						? colors[selectedColor]
						: shuffledColors[index % shuffledColors.length],
			}
			return acc
		}, {})
	}, [selectedColor, shuffledColors])

	useEffect(() => {
		onChange?.(
			selected === null
				? { icon: null, color: null }
				: {
						icon: icons[selected].name,
						color: icons[selected].color,
					},
		)
	}, [selected, selectedColor])

	return (
		<div className='flex flex-col gap-1 p-2 rounded-2xl shadow-sm border border-[var(--bg-border)]'>
			<p className='font-medium text-center text-[var(--middle-secondary)]'>
				Выберите иконку
			</p>

			<div className='grid grid-cols-5 items-center w-full h-33 p-2 overflow-x-scroll hide-scrollbar flex-wrap justify-start gap-1 shadow-inner rounded-3xl mb-1 border-1 border-[var(--bg-border)]'>
				{Object.entries(icons).map(([key, value]) => (
					<div
						key={key}
						onClick={() => setSelected(prev => (prev === key ? null : key))}
						style={{
							filter:
								selected === key &&
								`drop-shadow(1px 2px 3px var(--${value.color}-shadow))`,
							background: `linear-gradient(to bottom, var(--${value.color}-bg), var(--${value.color}-bg-contrast))`,
							color: `var(--${value.color}-text)`,
						}}
						className={`flex justify-center items-center rounded-2xl font-semibold aspect-square h-auto w-full transition-all ${selected === key ? 'scale-105' : `${selected !== null && 'grayscale-25 opacity-50'}`}`}
					>
						<img className='p-5' src={value.icon_path} alt='' />
					</div>
				))}
			</div>
			<div className='rounded-2xl shadow-sm border border-[var(--bg-border)] p-2'>
				<p className='text-xs text-center text-[var(--middle-secondary)]'>
					Выбор цвета
				</p>
				<div className='flex gap-3 overflow-x-auto hide-scrollbar rounded-3xl shadow-inner p-1'>
					{colors.map((item, index) => (
						<div
							key={item}
							className={`w-15 h-10 rounded-full flex-shrink-0 transition-all ${selectedColor === index ? 'scale-105' : `${selectedColor !== null && 'grayscale-25 opacity-50'}`}`}
							style={{
								backgroundColor: `var(--${item}-bg)`,
								filter:
									selectedColor === index &&
									`drop-shadow(1px 2px 3px var(--${item}-shadow))`,
							}}
							onClick={() =>
								setSelectedColor(prev => (prev === index ? null : index))
							}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export const NumberInput = ({ onChange, disabled }) => {
	const [number, setNumber] = useState(1)
	useEffect(() => {
		onChange?.(number)
	}, [number])
	return (
		<div
			className={`flex relative flex-col w-full gap-3 justify-center items-center rounded-2xl shadow-sm overflow-hidden border border-[var(--bg-border)] ${disabled && 'opacity-50'}`}
		>
			<p className='font-medium text-center text-[var(--middle-secondary)]'>
				Количество повторений в день
			</p>
			{disabled && (
				<div className='absolute bg-[#00000025] font-medium text-2xl text-center text-white top-0 left-0 z-15 w-full h-full flex items-center justify-center'></div>
			)}
			<div className='flex gap-3 justify-center items-center'>
				<Minus
					disabled={disabled}
					onClick={() => setNumber(prev => (prev > 1 ? prev - 1 : 1))}
					className={` ${number > 1 ? 'bg-[var(--secondary)] text-[var(--bg)] active:bg-[var(--hero)] active:text-[var(--hero-pale)]' : 'text-[var(--middle-secondary)] bg-[var(--middle-bg)]'} rounded-xl p-2 w-10 h-10   transition-all`}
				/>
				<p className='text-5xl font-semibold'>{number}</p>
				<Plus
					disabled={disabled}
					onClick={() => setNumber(prev => prev + 1)}
					className='bg-[var(--secondary)] rounded-xl p-2 w-10 h-10 text-[var(--bg)] active:bg-[var(--hero)] active:text-[var(--hero-pale)] transition-all'
				/>
			</div>

			<p className='font-light text-sm text-center text-[var(--middle-secondary)]'>
				Укажите, сколько раз в течение дня необходимо выполнить привычку.
				Например, для питья воды можно установить 8 повторений.
			</p>
		</div>
	)
}
