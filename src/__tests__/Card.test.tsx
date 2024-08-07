import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FavoritesProvider } from 'context/FavoritesContext';
import Card from 'components/Card/Card';
import { Art } from 'constants/api';
import '@testing-library/jest-dom';

describe('Card', () => {
	const mockArtItem: Art = {
		id: '1',
		title: 'Test Art',
		artist_title: 'Test Artist',
		image_id: 'test-image-id',
		is_public_domain: true,
		date_start: 2024,
		date_end: 2024,
		place_of_origin: 'USA',
		dimensions: '75.8 × 102.5 cm (29 13/16 × 40 5/16 in.)',
		credit_line: 'Mr. and Mrs. Lewis Larned Coburn Memorial Collection',
	};

	it('should render the card with the correct data', () => {
		render(
			<FavoritesProvider>
				<Router>
					<Card item={mockArtItem} />
				</Router>
			</FavoritesProvider>,
		);

		expect(screen.getByText('Test Art')).toBeInTheDocument();
		expect(screen.getByText('Test Artist')).toBeInTheDocument();
	});

	it('should toggle favorite status on button click', () => {
		render(
			<FavoritesProvider>
				<Router>
					<Card item={mockArtItem} />
				</Router>
			</FavoritesProvider>,
		);

		const favoriteButton = screen.getByTestId('favorite-button');
		fireEvent.click(favoriteButton);

		expect(favoriteButton).toHaveClass('active');
	});
});
