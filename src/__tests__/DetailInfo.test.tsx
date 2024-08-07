import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailInfo from 'pages/DetailInfo/DetailInfo';
import * as api from 'constants/api';
import { FavoritesProvider } from 'context/FavoritesContext';
import '@testing-library/jest-dom';

jest.mock('constants/api', () => ({
	...jest.requireActual('constants/api'),
	getArt: jest.fn(),
}));

const MockComponent = () => (
	<FavoritesProvider>
		<MemoryRouter initialEntries={['/art/1']}>
			<Routes>
				<Route path="/art/:id" element={<DetailInfo />}></Route>
			</Routes>
		</MemoryRouter>
	</FavoritesProvider>
);

describe('DetailInfo', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const mockArt = {
		id: '1',
		title: 'Mock Art',
		artist_title: 'Mock Artist',
		is_public_domain: true,
		date_start: 2024,
		date_end: 2024,
		place_of_origin: 'USA',
		dimensions: '10x10',
		credit_line: 'Mock Credit Line',
		image_id: 'mock-image-id',
	};

	test('should render loader while fetching data', () => {
		(api.getArt as jest.Mock).mockImplementation(() => new Promise(() => {}));

		render(<MockComponent />);
		expect(screen.getByTestId('loader')).toBeInTheDocument();
	});

	test('should display art details after fetching data', async () => {
		(api.getArt as jest.Mock).mockResolvedValue({ data: mockArt });

		render(<MockComponent />);

		await waitFor(() => {
			expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
		});

		expect(screen.getByText('Mock Art')).toBeInTheDocument();
		expect(screen.getByText('Mock Artist')).toBeInTheDocument();
		expect(screen.getByText('2024–2024')).toBeInTheDocument();
		expect(screen.getByText('USA')).toBeInTheDocument();
		expect(screen.getByText('Mock Credit Line')).toBeInTheDocument();
	});

	test('should toggle favorite on button click', async () => {
		(api.getArt as jest.Mock).mockResolvedValue({ data: mockArt });

		render(<MockComponent />);

		await waitFor(() => {
			expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
		});
		const favoriteButton = screen.getByTestId('favorite-button');
		fireEvent.click(favoriteButton);

		expect(favoriteButton).toHaveClass('button-favorite active');
	});

	test('should log error on fetch failure', async () => {
		const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

		(api.getArt as jest.Mock).mockRejectedValue(new Error('Fetch error'));
		render(<MockComponent />);

		await waitFor(() =>
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				'Error fetching art data:',
				expect.any(Error),
			),
		);

		consoleErrorSpy.mockRestore();
	});
});
