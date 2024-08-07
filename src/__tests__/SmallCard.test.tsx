import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SmallCard from 'components/SmallCard/SmallCard';
import { Art } from 'constants/api';
import { FavoritesProvider } from 'context/FavoritesContext';

jest.mock('utils/artHelpers', () => ({
	isKnown: (value: string) => value,
	isPublic: (value: boolean) => (value ? 'Public' : 'Private'),
}));

jest.mock('constants/api', () => ({
	URL_IMAGE: ({ imageId }: { imageId: string }) =>
		`http://example.com/${imageId}`,
}));

const mockArtItem: Art = {
	id: 1,
	title: 'Test Art',
	artist_title: 'Test Artist',
	is_public_domain: true,
	date_start: 2020,
	date_end: 2023,
	place_of_origin: 'Place A',
	dimensions: '10x10',
	credit_line: 'Credit A',
	image_id: 'image1',
};

describe('SmallCard component', () => {
	test('renders correctly with art item', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<SmallCard item={mockArtItem} />
				</MemoryRouter>
			</FavoritesProvider>,
		);

		const image = screen.getByAltText('Small Card Image');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', 'http://example.com/image1');

		expect(screen.getByText('Test Art')).toBeInTheDocument();
		expect(screen.getByText('Test Artist')).toBeInTheDocument();
		expect(screen.getByText('Public')).toBeInTheDocument();
	});

	test('toggles favorite state correctly', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<SmallCard item={mockArtItem} />
				</MemoryRouter>
			</FavoritesProvider>,
		);

		const favoriteButton = screen.getByTestId('favorite-button');

		fireEvent.click(favoriteButton);
		expect(favoriteButton).toHaveClass('button-favorite active');
	});
});
