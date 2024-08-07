import { render, screen, waitFor } from '@testing-library/react';
import CardList from 'components/CardList/CardList';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

describe('CardList', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('should display loader while fetching data', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));

		render(<CardList />);

		expect(screen.getByTestId('loader')).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
		});
	});
});
