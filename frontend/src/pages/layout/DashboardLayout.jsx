import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CreateButton from '../../components/ToolBar'

export default function DashboardLayout() {
	// РАБОТАЕТ КАК MAX-MD: В TAILWIND
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const [showSideBar, setShowSideBar] = useState(false)

	return (
		<div className='flex'>
			<div
				className={`flex min-h-screen  flex-col w-full`}
				style={{
					marginLeft: isMobile ? '0px' : SideBarWidth,
				}}
			>
				<CreateButton />

				<main className={`p-4`}>
					{/* <NavTrail /> */}
					<Outlet />
				</main>
			</div>
		</div>
	)
}
