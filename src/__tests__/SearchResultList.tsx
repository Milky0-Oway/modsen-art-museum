import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResultList from 'components/SearchResultList/SearchResultList.tsx';
import { Art } from 'constants/api.ts';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesProvider } from 'context/FavoritesContext.tsx';

describe('SearchResultList', () => {
	const mockSearchResult: Art[] = [
		{
			id: '1',
			title: 'Artwork A',
			date_end: 2024,
			date_start: 2024,
			credit_line: 'Credit A',
			dimensions: '10x10',
			place_of_origin: 'USA',
			is_public_domain: true,
			artist_title: 'Artist A',
			image_id: '1',
		},
		{
			id: '2',
			title: 'Artwork B',
			date_end: 2023,
			date_start: 2023,
			credit_line: 'Credit B',
			dimensions: '10x10',
			place_of_origin: 'USA',
			is_public_domain: true,
			artist_title: 'Artist B',
			image_id: '2',
		},
		{
			id: '3',
			title: 'Artwork C',
			date_end: 2024,
			date_start: 2024,
			credit_line: 'Credit C',
			dimensions: '10x10',
			place_of_origin: 'USA',
			is_public_domain: true,
			artist_title: 'Artist C',
			image_id: '3',
		},
	];

	it('should render loader when loading is true', () => {
		render(
			<MemoryRouter>
				<SearchResultList loading={true} searchResult={[]} />
			</MemoryRouter>,
		);

		expect(screen.getByTestId('loader')).toBeInTheDocument();
		expect(screen.queryByTestId('sort-dropdown')).not.toBeInTheDocument();
		expect(screen.queryByTestId('card')).not.toBeInTheDocument();
	});

	it('should render search results when loading is false', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<SearchResultList loading={false} searchResult={mockSearchResult} />
				</MemoryRouter>
			</FavoritesProvider>,
		);

		expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
		expect(screen.getByTestId('sort-dropdown')).toBeInTheDocument();
		expect(screen.getAllByTestId('card')).toHaveLength(mockSearchResult.length);
	});

	it('should sort search results by date', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<SearchResultList loading={false} searchResult={mockSearchResult} />
				</MemoryRouter>
			</FavoritesProvider>,
		);

		const dropdown = screen.getByRole('combobox');
		fireEvent.change(dropdown, { target: { value: 'date' } });

		const cards = screen.getAllByTestId('card');
		expect(cards[0]).toHaveTextContent('Artwork BArtist BPublic');
		expect(cards[1]).toHaveTextContent('Artwork AArtist APublic');
		expect(cards[2]).toHaveTextContent('Artwork CArtist CPublic');
	});

	it('should sort search results by date in reverse', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<SearchResultList loading={false} searchResult={mockSearchResult} />
				</MemoryRouter>
			</FavoritesProvider>,
		);

		const dropdown = screen.getByRole('combobox');
		fireEvent.change(dropdown, { target: { value: 'date_reverse' } });

		const cards = screen.getAllByTestId('card');
		expect(cards[0]).toHaveTextContent('Artwork AArtist APublic');
		expect(cards[1]).toHaveTextContent('Artwork CArtist CPublic');
		expect(cards[2]).toHaveTextContent('Artwork BArtist BPublic');
	});

	it('should sort search results by alphabet', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<SearchResultList loading={false} searchResult={mockSearchResult} />
				</MemoryRouter>
			</FavoritesProvider>,
		);

		const dropdown = screen.getByRole('combobox');
		fireEvent.change(dropdown, { target: { value: 'alphabet' } });

		const cards = screen.getAllByTestId('card');
		expect(cards[0]).toHaveTextContent('Artwork AArtist APublic');
		expect(cards[1]).toHaveTextContent('Artwork BArtist BPublic');
		expect(cards[2]).toHaveTextContent('Artwork CArtist CPublic');
	});

	it('should sort search results by alphabet in reverse', () => {
		render(
			<FavoritesProvider>
				<MemoryRouter>
					<SearchResultList loading={false} searchResult={mockSearchResult} />
				</MemoryRouter>
			</FavoritesProvider>,
		);

		const dropdown = screen.getByRole('combobox');
		fireEvent.change(dropdown, { target: { value: 'alphabet_reverse' } });

		const cards = screen.getAllByTestId('card');
		expect(cards[0]).toHaveTextContent('Artwork CArtist CPublic');
		expect(cards[1]).toHaveTextContent('Artwork BArtist BPublic');
		expect(cards[2]).toHaveTextContent('Artwork AArtist APublic');
	});
});
