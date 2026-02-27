import { useEffect, useState } from 'react'
import { GetUserHabits, LogHabit } from '../api/HabitsAPI'
import {
	Calendar,
	ImageOff,
	Plus,
	Timer,
	X,
	Apple,
	BedSingle,
	BicepsFlexed,
	BookOpen,
	Brain,
	Bubbles,
	Cigarette,
	Circle,
	Clock,
	Coffee,
	Dumbbell,
	Gamepad,
	Heart,
	Music,
	Pill,
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
	Info,
	CigaretteOff,
	Minus,
	Check,
} from 'lucide-react'
import { initialIcons } from '../data/icons'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const CircleProgress = ({ total, value, color, size = 60, onClick }) => {
	const percent = total ? Math.min((value / total) * 100, 100) : 0

	const stroke = 6
	const radius = 50 - stroke
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (percent / 100) * circumference

	return (
		<div
			onClick={onClick}
			style={{ width: size, height: size }}
			className='relative cursor-pointer active:scale-105 transition-transform'
		>
			<svg viewBox='0 0 100 100' className='w-full h-full'>
				<circle
					cx='50'
					cy='50'
					r={radius}
					stroke={`var(--${color}-bg-pale)`}
					strokeWidth={stroke}
					fill='none'
				/>

				<circle
					cx='50'
					cy='50'
					r={radius}
					stroke={`var(--${color}-text)`}
					strokeWidth={stroke}
					fill='none'
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap='round'
					style={{ transition: '0.3s' }}
					transform='rotate(-90 50 50)'
				/>
			</svg>

			<div
				className={`absolute inset-0 flex items-center justify-center rounded-full ${value === total ? 'opacity-100' : 'opacity-50'}  active:opacity-100 transition-all`}
				style={{
					background: `var(--${color}-text)`,
					color: `var(--${color}-bg)`,
				}}
			>
				{value === total ? (
					<Check size={size * 0.45} strokeWidth={2.2} />
				) : (
					<Plus size={size * 0.45} strokeWidth={2.2} />
				)}
			</div>
		</div>
	)
}

const Flames = ({ size = 18, className = '', streakCount, bgColor }) => {
	const getFlameData = streak => {
		const levels = [
			{ min: 300, img: '/flames/7.png', color: '#00d9ff' },
			{ min: 200, img: '/flames/6.png', color: '#0095ff' },
			{ min: 100, img: '/flames/5.png', color: '#9a1dde' },
			{ min: 50, img: '/flames/4.png', color: '#ff00b3' },
			{ min: 30, img: '/flames/3.png', color: '#ff2457' },
			{ min: 10, img: '/flames/2.png', color: '#ff8000' },
		]

		const level = levels.find(l => streak >= l.min) || {
			img: '/flames/1.png',
			color: '#ffae00',
		}

		// затемняем цвет для тени
		const darken = (hex, amount = 0.25) => {
			const num = parseInt(hex.replace('#', ''), 16)
			let r = (num >> 16) & 255
			let g = (num >> 8) & 255
			let b = num & 255

			r = Math.floor(r * (1 - amount))
			g = Math.floor(g * (1 - amount))
			b = Math.floor(b * (1 - amount))

			return `rgb(${r}, ${g}, ${b})`
		}

		return {
			...level,
			shadow: darken(level.color, 0.1),
		}
	}
	const { img, color, shadow } = getFlameData(streakCount)

	return (
		<div
			className={`flex gap-1 items-center px-2 rounded-full`}
			style={{ background: `var(--${bgColor}-bg-pale)` }}
		>
			<img
				style={{ width: size, height: size }}
				className={className}
				src={img}
				alt=''
			/>

			<p
				style={{
					color,
				}}
				className='font-semibold text-lg pt-1'
			>
				{streakCount}
			</p>
		</div>
	)
}

const HabitCard = ({
	id,
	icon,
	color,
	title,
	flame = 0,
	logsCount,
	currentLog,
	onUpdate,
}) => {
	const iconPath = icon
		? initialIcons.find(i => i.name === icon)?.icon_path
		: null

	const updateLog = () => {
		try {
			LogHabit(id)
			onUpdate?.(true)
		} catch (e) {}
	}

	return (
		<div
			className='w-full h-auto aspect-square flex flex-col justify-between rounded-4xl p-2 shadow-lg'
			style={{
				background: `linear-gradient(to bottom, var(--${color}-bg), var(--${color}-bg-contrast))`,
			}}
		>
			<div className='flex justify-between items-center gap-1 h-1/4 w-full'>
				{iconPath && (
					<div
						className='rounded-full flex items-center justify-center h-full w-auto aspect-square'
						style={{
							background: `var(--${color}-bg-pale)`,
							color: `var(--${color}-text)`,
						}}
					>
						<img className='p-3' src={iconPath} alt='' />
					</div>
				)}
				<div className='flex items-center gap-1 h-2/5 mr-1'>
					<Flames
						size={24}
						className={'grayscale-0'}
						streakCount={flame}
						bgColor={color}
					/>
				</div>
			</div>
			<div className='flex flex-col justify-between items-center h-3/4 w-full'>
				<p
					className='font-semibold text-xl'
					style={{
						color: `var(--${color}-text)`,
					}}
				>
					{title}
				</p>
				<CircleProgress
					total={logsCount}
					value={currentLog}
					color={color}
					onClick={() => updateLog()}
				/>
				<p
					className='font-light text-xs opacity-75'
					style={{
						color: `var(--${color}-text)`,
					}}
				>
					{currentLog !== logsCount
						? logsCount > 1
							? `${currentLog} / ${logsCount}`
							: 'Tap to Log'
						: 'Complete'}
				</p>
			</div>
		</div>
	)
}

const HabitTracker = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [updates, setUpdates] = useState(false)

	const [habits, setHabits] = useState(null)
	const Option = [
		{ title: 'Сегодня', query: 'today', activeColor: 'teal' },
		{ title: 'Все', query: 'all', activeColor: 'pink' },
	]

	const searchParams = new URLSearchParams(location.search)
	const tab = searchParams.get('tab') || 'all'

	useEffect(() => {
		if (!location.search) {
			navigate('/habits?tab=today', { replace: true })
		}
	}, [location.search])

	useEffect(() => {
		const load = async () => {
			try {
				const data = await GetUserHabits(tab)
				setHabits(data)
				setUpdates(false)
			} catch (e) {}
		}
		load()
	}, [tab, updates])

	return (
		<>
			<div className='flex gap-3 mb-3'>
				{Option?.map(item => (
					<NavLink
						key={item.query}
						to={`/habits?tab=${item.query}`}
						style={{
							background:
								tab === item.query
									? `var(--${item.activeColor}-text)`
									: 'var(--middle-bg)',
							color:
								tab === item.query
									? `var(--${item.activeColor}-bg)`
									: 'var(--middle-secondary)',
						}}
						className='px-4 py-1 rounded-full text-lg'
					>
						{item.title}
					</NavLink>
				))}
			</div>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
				{habits?.map(item => (
					<HabitCard
						id={item.id}
						icon={item.icon_url}
						color={item.color}
						title={item.title}
						logsCount={item.logs_to_complete}
						currentLog={item.current_logs}
						flame={item.current_streak}
						onUpdate={setUpdates}
					/>
				))}
			</div>
		</>
	)
}
export default HabitTracker
