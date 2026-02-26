import { useEffect, useState } from 'react'
import { GetUserHabits } from '../api/HabitsAPI'
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
	Flame,
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
	FlameIcon,
	Minus,
	Check,
} from 'lucide-react'

const iconMap = {
	circle: Circle,
	triangle: Triangle,
	square: Square,
	dumbbell: Dumbbell,
	bubbles: Bubbles,
	pill: Pill,
	apple: Apple,
	brain: Brain,
	biceps: BicepsFlexed,
	bed: BedSingle,
	book: BookOpen,
	gamepad: Gamepad,
	scroll: ScrollText,
	coffee: Coffee,
	cigarette: Cigarette,
	wine: Wine,
	music: Music,
	phone: Smartphone,
	sun: SunMedium,
	flame: Flame,
	heart: Heart,
	trash: Trash,
	bag: ShoppingBag,
	shield: Shield,
	target: Target,
	clock: Clock,
	zap: Zap,
	cigarette_off: CigaretteOff,
}
const CircleProgress = ({ total, value, color }) => {
	const percent = total ? Math.min((value / total) * 100, 100) : 0

	const radius = 40
	const stroke = 10
	const normalizedRadius = radius - stroke * 0.5
	const circumference = normalizedRadius * 2 * Math.PI

	const strokeDashoffset = circumference - (percent / 100) * circumference

	return (
		<div className='flex justify-center items-center w-full h-full'>
			<svg className='w-full h-full' viewBox='0 0 100 100'>
				<circle
					stroke={`var(--${color}-bg-pale)`}
					fill='transparent'
					strokeWidth={stroke}
					r={normalizedRadius}
					cx='50'
					cy='50'
				/>

				<circle
					stroke={`var(--${color}-text)`}
					fill='transparent'
					strokeWidth={stroke}
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap='round'
					r={normalizedRadius}
					cx='50'
					cy='50'
					style={{
						transition: 'stroke-dashoffset 0.3s ease',
						transform: 'rotate(-90deg)',
						transformOrigin: '50% 50%',
					}}
				/>

				<text
					x='50'
					y='50'
					textAnchor='middle'
					dy='0.35em'
					fontSize='18'
					fill={`var(--${color}-text)`}
					fontWeight='600'
				>
					{value}/{total}
				</text>
			</svg>
		</div>
	)
}

const HabitCard = ({
	icon,
	color,
	title,
	flame = 0,
	logsCount,
	completeLog,
}) => {
	const IconComponent = icon ? iconMap[icon] : null
	const [completeLogs, setCompleteLogs] = useState(0)
	return (
		<div
			className='w-full h-auto aspect-square flex flex-col justify-between rounded-4xl p-2 shadow-lg'
			style={{
				background: `linear-gradient(to bottom, var(--${color}-bg), var(--${color}-bg-contrast))`,
			}}
		>
			<div className='flex justify-start items-center gap-3 h-1/4 w-full'>
				{IconComponent && (
					<div
						className='rounded-full flex items-center justify-center h-full w-auto aspect-square'
						style={{
							background: `var(--${color}-bg-pale)`,
							color: `var(--${color}-text)`,
						}}
					>
						<IconComponent className='w-2/3 h-2/3' />
					</div>
				)}
				<div className='flex items-center gap-1 h-2/5'>
					<FlameIcon className='h-full w-auto text-amber-400 opacity-75' />
					<p className='text-amber-400 opacity-75 text-lg pt-1'>{flame}</p>
				</div>
			</div>
			<div className='flex flex-col gap-3 items-center h-3/4 w-full'>
				<p
					className='font-semibold text-xl'
					style={{
						color: `var(--${color}-text)`,
					}}
				>
					{title}
				</p>
				{logsCount === completeLog ? (
					<>
						<Check
							className='rounded-full w-auto h-full p-4'
							style={{
								background: `var(--${color}-text)`,
								color: `var(--${color}-bg)`,
							}}
						/>
						<p
							className='font-light text-xs opacity-75'
							style={{
								color: `var(--${color}-text)`,
							}}
						>
							Completed
						</p>
					</>
				) : (
					<>
						{logsCount > 1 ? (
							<>
								<div className='grid grid-cols-4 items-center w-full h-full'>
									<div className='flex justify-center col-span-1'>
										<Minus
											onClick={() => setCompleteLogs(prev => prev - 1)}
											className='rounded-full aspect-square w-3/4 h-auto'
											style={{
												background: `var(--${color}-bg-pale)`,
												color: `var(--${color}-text)`,
											}}
										/>
									</div>

									<div className='flex justify-center w-full col-span-2'>
										<CircleProgress
											total={logsCount}
											value={completeLogs}
											color={color}
										/>
									</div>

									<div className='flex justify-center col-span-1'>
										<Plus
											onClick={() => setCompleteLogs(prev => prev + 1)}
											className='rounded-full aspect-square w-3/4 h-auto'
											style={{
												background: `var(--${color}-text)`,
												color: `var(--${color}-bg)`,
											}}
										/>
									</div>
								</div>
							</>
						) : (
							<>
								<Plus
									className='rounded-full w-auto h-full'
									style={{
										background: `var(--${color}-text)`,
										color: `var(--${color}-bg)`,
									}}
								/>
								<p
									className='font-light text-xs opacity-75'
									style={{
										color: `var(--${color}-text)`,
									}}
								>
									Tap to Log
								</p>
							</>
						)}
					</>
				)}
			</div>
		</div>
	)
}

const HabitTracker = () => {
	const [habits, setHabits] = useState(null)

	useEffect(() => {
		const load = async () => {
			try {
				const data = await GetUserHabits()
				setHabits(data)
			} catch (e) {}
		}

		load()
	}, [])

	return (
		<div className='grid grid-cols-2 gap-3'>
			{habits?.map(item => (
				<HabitCard
					icon={item.icon_url}
					color={item.color}
					title={item.title}
					logsCount={item.logs_to_complete}
					completeLog={0}
				/>
			))}
		</div>
	)
}
export default HabitTracker
