import { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home.tsx';
import DetailInfo from './pages/DetailInfo/DetailInfo.tsx';
import Favorites from './pages/Favorites/Favorites.tsx';

function App(): JSX.Element {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/art/:id" element={<DetailInfo />} />
				<Route path="/favorites" element={<Favorites />} />
			</Routes>
		</Router>
	);
}

export default App;
