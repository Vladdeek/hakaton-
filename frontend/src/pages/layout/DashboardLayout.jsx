import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import CreateModal from '../../components/ToolBar'

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

	const [showModal, setShowModal] = useState(false)

	return (
		<div className='flex'>
			<div
				className={`flex min-h-screen relative flex-col w-full`}
				style={{
					marginLeft: isMobile ? '0px' : SideBarWidth,
				}}
			>
				<div className='absolute flex justify-between items-center w-full p-4'>
					<p className='text-5xl font-semibold'>Habits</p>
					<Plus size={48} onClick={() => setShowModal(true)} />
				</div>
				<CreateModal show={showModal} />

				<main className={`p-4 mt-20`}>
					{/* <NavTrail /> */}
					<Outlet />
				</main>
			</div>
		</div>
	)
}
