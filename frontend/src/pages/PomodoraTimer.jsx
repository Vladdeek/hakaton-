const PomodoraTimer = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-4xl font-bold mb-4'>Pomadora Timer</h1>
			<div className='text-2xl font-mono mb-8'>25:00</div>
			<button className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'>
				Start
			</button>
		</div>
	)
}
export default PomodoraTimer
