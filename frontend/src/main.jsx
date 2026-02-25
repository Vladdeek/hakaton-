import { createRoot } from 'react-dom/client'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from 'react-router-dom'
import { Suspense, useState } from 'react'
import './index.css'
import './themes.css'
import { Toaster } from 'react-hot-toast'
import DashboardLayout from './pages/layout/DashboardLayout'
import PomodoraTimer from './pages/PomodoraTimer'
import HabitTracker from './pages/HabitTracker'

function MainApp() {
	return (
		<Suspense
			fallback={
				<>
					<p>Загрузка</p>
				</>
			}
		>
			<Routes>
				<Route path='/' element={<DashboardLayout />}>
					<Route path='pomodora' element={<PomodoraTimer />}></Route>
					<Route path='habits' element={<HabitTracker />}></Route>
				</Route>
			</Routes>
		</Suspense>
	)
}

createRoot(document.getElementById('root')).render(
	<Router>
		<Toaster position='top-right' />
		<div className='relative'>
			{/* <Snowfall
				style={{
					position: 'fixed',
					width: '100vw',
					height: '100vh',
					zIndex: 9999,
					pointerEvents: 'none',
				}}
			/> */}
			<MainApp />
		</div>
	</Router>,
)
