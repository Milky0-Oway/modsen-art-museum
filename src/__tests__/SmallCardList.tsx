import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SmallCardList from 'components/SmallCardList/SmallCardList';
import { getData } from 'constants/api';

jest.mock('constants/api', () => ({
	getData: jest.fn(),
}));

describe('SmallCardList component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders loader while loading data', async () => {
		(getData as jest.Mock).mockResolvedValueOnce({ data: [] });

		render(<SmallCardList />);

		expect(screen.getByTestId('loader')).toBeInTheDocument();

		await waitFor(() =>
			expect(screen.queryByTestId('loader')).not.toBeInTheDocument(),
		);
	});

	test('handles error during data loading', async () => {
		(getData as jest.Mock).mockRejectedValueOnce(
			new Error('Failed to fetch data'),
		);

		const consoleErrorMock = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		render(<SmallCardList />);

		await waitFor(() =>
			expect(screen.queryByTestId('loader')).not.toBeInTheDocument(),
		);

		expect(consoleErrorMock).toHaveBeenCalledWith(expect.any(Error));
		consoleErrorMock.mockRestore();
	});
});
