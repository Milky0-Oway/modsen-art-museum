import { render, screen } from '@testing-library/react';
import Favorites from 'pages/Favorites/Favorites';
import '@testing-library/jest-dom';
import { FavoritesProvider } from 'context/FavoritesContext.tsx';
import { MemoryRouter } from 'react-router-dom';

jest.mock('components/SectionName/SectionName', () => () => (
	<div data-testid="section-name">SectionName Mock</div>
));

jest.mock('components/FavoritesList/FavoritesList', () => () => (
	<div data-testid="favorites-list">FavoritesList Mock</div>
));

describe('Favorites', () => {
	test('should render without crashing', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<Favorites />
				</MemoryRouter>
			</FavoritesProvider>,
		);
		expect(screen.getByText(/Here Are Your/i)).toBeInTheDocument();
	});

	test('should render SectionName component', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<Favorites />
				</MemoryRouter>
			</FavoritesProvider>,
		);
		expect(screen.getByTestId('section-name')).toBeInTheDocument();
	});

	test('should render FavoritesList component', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<Favorites />
				</MemoryRouter>
			</FavoritesProvider>,
		);
		expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
	});
});
