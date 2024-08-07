import { render, screen } from '@testing-library/react';
import Home from 'pages/Home/Home';
import '@testing-library/jest-dom';
import { FavoritesProvider } from 'context/FavoritesContext.tsx';
import { MemoryRouter } from 'react-router-dom';

jest.mock(
	'components/SearchBar/SearchBar',
	() => (onSearch: (searchData: string) => void) => (
		<button onClick={() => onSearch('test')}>Search</button>
	),
);

jest.mock('components/SearchResultList/SearchResultList', () => () => (
	<div data-testid="search-result-list">SearchResultList Mock</div>
));

jest.mock('components/CardList/CardList', () => () => (
	<div data-testid="card-list">CardList Mock</div>
));

jest.mock('components/SmallCardList/SmallCardList', () => () => (
	<div data-testid="small-card-list">SmallCardList Mock</div>
));

describe('Home', () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('should render CardList component', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</FavoritesProvider>,
		);
		expect(screen.getByTestId('card-list')).toBeInTheDocument();
	});

	test('should render SmallCardList component', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</FavoritesProvider>,
		);
		expect(screen.getByTestId('small-card-list')).toBeInTheDocument();
	});
});
