import { JSX } from 'react';

import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import SectionName from '../../components/SectionName/SectionName.tsx';
import FavoritesList from '../../components/FavoritesList/FavoritesList.tsx';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary.tsx';

import './Favorites.scss';

const Favorites = (): JSX.Element => {
	return (
		<ErrorBoundary>
			<Header isHomePage={false} />
			<main>
				<section className="favorites-title">
					<h1>
						Here Are Your
						<span className="text-primary bookmark"> Favorites</span>
					</h1>
				</section>
				<section className="favorites-list">
					<SectionName title="Your favorites list" subtitle="Saved by you" />
					<FavoritesList />
				</section>
			</main>
			<Footer />
		</ErrorBoundary>
	);
};

export default Favorites;
