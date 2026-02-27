import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import CreateModal from '../../components/ToolBar'

export default function DashboardLayout() {
	const [showModal, setShowModal] = useState(false)

	return (
		<div className='flex'>
			<div className={`flex min-h-screen relative flex-col w-full`}>
				<div className='absolute flex justify-between items-center w-full p-4'>
					<p className='text-5xl font-semibold'>Habits</p>
					<Plus size={48} onClick={() => setShowModal(true)} />
				</div>
				<CreateModal show={showModal} notShow={setShowModal} />
				<main className={`p-4 mt-20`}>
					{/* <NavTrail /> */}
					<Outlet />
				</main>
			</div>
		</div>
	)
}
