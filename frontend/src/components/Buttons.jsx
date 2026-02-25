import { useState } from 'react'

export const ToggleButton = ({ option = [], value, onChange, theme }) => {
	const [selected, setSelected] = useState(value ?? option[0]?.id)
	const [translate, setTranslate] = useState(false)

	const selectedIndex = option.findIndex(o => o.id === selected)
	const widthPercent = 100 / option.length
	const activeOption = option[selectedIndex]

	const handleSelect = id => {
		setSelected(id)
		onChange?.(id)
		setTranslate(true)
		setTimeout(() => setTranslate(false), 150)
	}

	const getBg = color => `var(--${color}-bg)`
	const getText = color => `var(--${color}-text)`

	return (
		<div
			className={`relative w-full h-12 ${theme === 'dark' ? 'bg-[var(--secondary)] border-[var(--secondary-border)]' : 'bg-[var(--bg)] border-[var(--bg-border)]'}  shadow-sm border-1  rounded-xl overflow-hidden p-1 transition-all duration-300`}
		>
			{/* Обертка чтобы padding работал */}
			<div className='relative w-full h-full'>
				{/* Активная подложка */}
				<div
					className={`absolute top-0 left-0 h-full rounded-lg transition-all duration-300 `}
					style={{
						width: `${widthPercent}%`,
						transform: `translateX(${selectedIndex * 100}%)`,
						background: activeOption
							? getBg(activeOption.color)
							: `${theme === 'dark' ? ' bg-[var(--bg)] border-[var(--bg-border)]' : 'bg-[var(--secondary)] border-[var(--secondary-border)]'}`,
						filter: `drop-shadow(0px 1px 2px var(--${activeOption.color}-shadow))`,
					}}
				/>

				{/* Кнопки */}
				<div className='relative flex h-full'>
					{option.map(item => (
						<div
							key={item.id}
							onClick={() => handleSelect(item.id)}
							className='flex items-center justify-center cursor-pointer transition-all'
							style={{
								width: `${widthPercent}%`,
								color:
									selected === item.id
										? getText(item.color)
										: `${theme !== 'dark' ? 'var(--secondary)' : 'var(--bg)'}`,
							}}
						>
							{item.label}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export const DefaultButton = ({ title }) => {
	return (
		<button className='w-full bg-[var(--secondary)] text-[var(--bg)] py-3 rounded-xl shadow-sm border-1 border-[--secondary-border] active:bg-[var(--hero)] active:text-[var(--hero-pale)] transition-all active:scale-101'>
			{title}
		</button>
	)
}
