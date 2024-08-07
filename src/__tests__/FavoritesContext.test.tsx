import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from 'context/FavoritesContext';
import { Art } from 'constants/api';
import '@testing-library/jest-dom';

const TestComponent = () => {
	const { favorites, toggleFavorite } = useFavorites();
	return (
		<div>
			<button
				onClick={() =>
					toggleFavorite({
						id: '1',
						title: 'Test Art',
						artist_title: 'Artist',
						is_public_domain: true,
						date_start: 2024,
						date_end: 2024,
						place_of_origin: 'USA',
						dimensions: '10x10',
						credit_line: 'Credit',
						image_id: '1',
					} as Art)
				}
			>
				Toggle Favorite
			</button>
			<div data-testid="favorites-count">{favorites.length}</div>
		</div>
	);
};

describe('FavoritesContext', () => {
	beforeEach(() => {
		const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
		getItemSpy.mockReturnValueOnce(JSON.stringify([]));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should initialize favorites from sessionStorage', () => {
		render(
			<FavoritesProvider>
				<TestComponent />
			</FavoritesProvider>,
		);

		expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
	});

	test('should add an art piece to favorites', () => {
		render(
			<FavoritesProvider>
				<TestComponent />
			</FavoritesProvider>,
		);

		const button = screen.getByText('Toggle Favorite');
		fireEvent.click(button);

		expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
	});

	test('should remove an art piece from favorites', () => {
		render(
			<FavoritesProvider>
				<TestComponent />
			</FavoritesProvider>,
		);

		const button = screen.getByText('Toggle Favorite');
		fireEvent.click(button);
		fireEvent.click(button);

		expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
	});

	test('should update sessionStorage on favorites change', () => {
		const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

		render(
			<FavoritesProvider>
				<TestComponent />
			</FavoritesProvider>,
		);

		const button = screen.getByText('Toggle Favorite');
		fireEvent.click(button);

		expect(setItemSpy).toHaveBeenCalledWith('favorites', expect.any(String));
	});
});
