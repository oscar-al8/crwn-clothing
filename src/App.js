import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/Home'
import Navigation from './routes/navigation/Navigation'
import Authentication from './routes/authentication/Authentication'
import Shop from './routes/shop/Shop'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop' element={<Shop />} />
				<Route path='sign-in' element={<Authentication />} />
				<Route path='shop' element={<Shop />} />
			</Route>
		</Routes>
	)
}

export default App
