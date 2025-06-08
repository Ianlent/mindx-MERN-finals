import './App.css'
import TeacherPage from './assets/teachers/TeacherPage'
import { Route, Routes } from 'react-router-dom'

function App() {

	return (
		<Routes>
			<Route path="/" element={<TeacherPage />} />
		</Routes>
	)
}

export default App
