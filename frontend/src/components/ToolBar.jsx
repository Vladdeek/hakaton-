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
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { DefaultButton, ToggleButton } from './Buttons'
import { DefaultInput, IconInput, NumberInput, WeekDayInput } from './Inputs'
import { CreateHabit } from '../api/HabitsAPI'

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

const Preview = ({ icon, title }) => {
	const IconComponent = icon?.icon ? iconMap[icon.icon] : null

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			<div
				className='w-25 h-25 flex items-center justify-center rounded-full'
				style={{
					background:
						icon?.color !== null
							? `var(--${icon.color}-bg)`
							: 'var(--middle-bg)',
					color:
						icon?.color !== null
							? `var(--${icon.color}-text)`
							: 'var(--middle-secondary)',
				}}
			>
				{IconComponent ? (
					<IconComponent className='w-1/2 h-1/2' />
				) : (
					<ImageOff className='w-1/2 h-1/2' />
				)}
			</div>

			<p className='text-xl font-semibold text-[var(--secondary)]'>
				{title || 'Название привычки'}
			</p>
		</div>
	)
}

const CreateModal = ({ show }) => {
	const [selected, setSelected] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const [showInfo, setShowInfo] = useState(false)
	const [title, setTitle] = useState('')
	const [weekDays, setWeekDays] = useState([])
	const [logToComplete, setLogToComplete] = useState(1)
	const [icon, setIcon] = useState({})

	useEffect(() => {
		if (show === true) {
			setShowModal(show)
		}
	}, [show])
	const option = [
		{
			id: 0,
			label: 'Хорошая',
			color: 'green',
		},

		{
			id: 1,
			label: 'Плохая',
			color: 'red',
		},
	]

	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [showModal])

	const handleCreateHabit = async () => {
		try {
			const data = {
				title,
				days_to_log: weekDays,
				type: selected === 0 ? 'good' : 'bad',
				icon_url: icon?.icon,
				color: icon.color,
				logs_to_complete: logToComplete,
			}
			const res = await CreateHabit(data)

			setShowModal(false)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (selected === 1) {
			setWeekDays([0, 1, 2, 3, 4, 5, 6])
			setLogToComplete(1)
		}
	}, [selected])

	return (
		<>
			{showModal && (
				<div className='relative w-screen h-screen flex justify-center items-center backdrop-blur-xs bg-[#15151525] z-10'>
					{showInfo && (
						<div className='relative w-screen h-screen flex justify-center items-center  backdrop-blur-xs bg-[#15151525] z-20 '>
							<div className='absolute w-[95vw] h-[55vh] overflow-hidden flex flex-col rounded-2xl bg-[var(--bg)] shadow-xl z-21 p-2'>
								<div className='flex justify-end items-center w-full mb-2'>
									<X
										onClick={() => setShowInfo(false)}
										className='cursor-pointer w-8 h-8 text-[var(--secondary)]'
									/>
								</div>
								<div className='flex flex-col gap-2 w-full overflow-y-scroll'>
									<p className='text-[var(--green-bg)] py-1 px-3 bg-[var(--green-text)] shadow-sm rounded-2xl'>
										<span className='font-semibold text-xl'>
											Хорошие привычки:
										</span>
										<br />
										Отмечайте дни, в которых вы выполнили задачу привычки. Такой
										тип подходит для полезных действий, которые вы хотите
										выполнять регулярно.
									</p>

									<p className='text-[var(--red-bg)] py-1 px-3 bg-[var(--red-text)] shadow-sm rounded-2xl'>
										<span className='font-semibold text-xl'>
											Плохие привычки:
										</span>
										<br />
										Отмечайте только дни с нарушением привычки. Используется для
										контроля вредных действий — отмечается день, если вы
										сорвались.
									</p>
									<p className='text-[var(--middle-secondary)] px-4'>
										Хорошая привычка имеет более гибкие настройки. Вы можете
										выбрать конкретные дни недели для выполнения задачи, а также
										задать, сколько раз в день необходимо выполнять привычку.
									</p>
									<div className='flex flex-col gap-2 text-[var(--secondary)]'>
										<p className='font-semibold text-lg text-center'>Примеры</p>

										<div className='p-2 rounded-2xl bg-[var(--green-text)] shadow-sm'>
											<p className='font-medium text-[var(--green-bg)]'>
												Хорошая привычка
											</p>
											<p className='text-sm text-[var(--green-bg)]'>
												Например: пить воду — настроить привычку на 8 стаканов в
												день или задать конкретные дни выполнения, если вы
												хотите контролировать потребление воды только по
												расписанию.
											</p>
										</div>

										<div className='p-2 rounded-2xl bg-[var(--red-text)] shadow-sm'>
											<p className='font-medium text-[var(--red-bg)]'>
												Плохая привычка
											</p>
											<p className='text-sm text-[var(--red-bg)]'>
												Например: курение — отмечать дни, когда произошёл срыв,
												без расписания.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					<div className='absolute w-[95vw] h-[75vh] flex flex-col rounded-2xl bg-[var(--bg)] shadow-xl z-11 p-2'>
						<div className='flex justify-end items-center w-full mb-2'>
							<Info
								onClick={() => setShowInfo(true)}
								className='cursor-pointer w-8 h-8 text-[var(--secondary)] text-blue-600'
							/>
							<p className='w-full text-center text-[var(--secondary)] font-medium text-2xl'>
								Создание привычки
							</p>
							<X
								onClick={() => setShowModal(false)}
								className='cursor-pointer w-8 h-8 text-[var(--secondary)]'
							/>
						</div>

						<div className='flex relative h-full flex-col gap-3 overflow-hidden '>
							<div className='absolute top-0 w-full z-12'>
								<ToggleButton option={option} onChange={setSelected} />
							</div>
							<div className='overflow-y-scroll hide-scrollbar '>
								<div className='my-15 flex flex-col gap-2'>
									<Preview title={title} icon={icon} />
									<DefaultInput
										label='Введите название привычки'
										value={title}
										onChange={e => setTitle(e.target.value)}
										theme='light'
									/>
									<IconInput onChange={setIcon} />
									{selected === 0 && (
										<>
											<WeekDayInput onChange={setWeekDays} />
											<NumberInput onChange={setLogToComplete} />
										</>
									)}
								</div>
							</div>
							<div className='absolute bottom-0 w-full'>
								<DefaultButton
									onClick={handleCreateHabit}
									title={'Создать'}
									disabled={!title.length > 0 || !icon?.icon}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default CreateModal
