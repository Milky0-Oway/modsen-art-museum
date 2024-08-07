import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoritesList from 'components/FavoritesList/FavoritesList.tsx';
import { useFavorites } from 'context/FavoritesContext.tsx';

jest.mock('components/SmallCard/SmallCard.tsx', () => {
	return jest.fn(({ item }) => (
		<div data-testid="small-card">{item.title}</div>
	));
});

jest.mock('context/FavoritesContext.tsx', () => ({
	useFavorites: jest.fn(),
}));

describe('FavoritesList', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render no favorites message when favorites is empty', () => {
		(useFavorites as jest.Mock).mockReturnValue({ favorites: [] });

		render(<FavoritesList />);

		expect(screen.getByText('No favorites yet :(')).toBeInTheDocument();
		expect(screen.getByText('Add something')).toBeInTheDocument();
		expect(screen.queryByTestId('small-card')).not.toBeInTheDocument();
	});

	it('should render favorites correctly when they exist', () => {
		const mockFavorites = [
			{ id: '1', title: 'Artwork 1' },
			{ id: '2', title: 'Artwork 2' },
		];
		(useFavorites as jest.Mock).mockReturnValue({ favorites: mockFavorites });

		render(<FavoritesList />);

		expect(screen.getByText('Artwork 1')).toBeInTheDocument();
		expect(screen.getByText('Artwork 2')).toBeInTheDocument();
		expect(screen.queryByText('No favorites yet :(')).not.toBeInTheDocument();
	});
});
