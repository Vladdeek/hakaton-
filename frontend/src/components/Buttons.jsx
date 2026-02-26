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
			className={`relative w-full h-12 ${theme === 'dark' ? 'bg-[var(--secondary)] border-[var(--secondary-border)]' : 'bg-[var(--bg)] border-[var(--bg-border)]'}  shadow-sm border-1  rounded-xl overflow-hidden p-1 transition-all duration-300 select-none`}
		>
			{/* Обертка чтобы padding работал */}
			<div className='relative w-full h-full'>
				{/* Активная подложка */}
				<div
					className={`absolute top-0 left-0 ${activeOption.color === 'default' && `${theme === 'dark' ? 'border-[var(--bg-border)]' : 'border-[var(--secondary-border)]'}`} h-full rounded-lg transition-all duration-300 `}
					style={{
						width: `${widthPercent}%`,
						transform: `translateX(${selectedIndex * 100}%)`,
						background:
							activeOption.color && activeOption.color !== 'default'
								? getBg(activeOption.color)
								: `${theme === 'dark' ? 'var(--bg)' : 'var(--secondary)'}`,
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
										? `${
												item.color === 'default'
													? `${
															theme !== 'dark'
																? 'var(--bg)'
																: 'var(--secondary)'
														}`
													: getText(item.color)
											}`
										: theme === 'dark'
											? 'var(--bg)'
											: 'var(--secondary)',
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

export const DefaultButton = ({ title, onClick, disabled }) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`w-full py-3 rounded-xl shadow-sm transition-all ${
				disabled
					? 'bg-[var(--middle-bg)] text-[var(--middle-secondary)]'
					: 'bg-[var(--secondary)] text-[var(--bg)] active:bg-[var(--hero)] active:text-[var(--hero-pale)] active:scale-101 cursor-pointer'
			}`}
		>
			{title}
		</button>
	)
}
