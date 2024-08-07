import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from 'components/SearchBar/SearchBar.tsx';

jest.mock('utils/useDebounce.ts', () => {
	return (value: string) => value;
});

describe('SearchBar', () => {
	const mockOnSearch = jest.fn();

	beforeEach(() => {
		mockOnSearch.mockClear();
	});

	it('should render the input field', () => {
		render(<SearchBar onSearch={mockOnSearch} />);

		const input = screen.getByPlaceholderText('Search Art, Artist, Work...');
		expect(input).toBeInTheDocument();
	});

	it('should display validation error for input shorter than 3 characters', async () => {
		render(<SearchBar onSearch={mockOnSearch} />);

		const input = screen.getByPlaceholderText('Search Art, Artist, Work...');
		fireEvent.change(input, { target: { value: 'ab' } });

		await waitFor(() => {
			const inputWrapper = screen
				.getByPlaceholderText('Search Art, Artist, Work...')
				.closest('.input-wrapper');
			expect(inputWrapper).toHaveAttribute(
				'data-error',
				'Search data must be at least 3 characters long.',
			);
		});
	});

	it('should call onSearch with correct input value when input length is 3 or more', async () => {
		render(<SearchBar onSearch={mockOnSearch} />);

		const input = screen.getByPlaceholderText('Search Art, Artist, Work...');
		fireEvent.change(input, { target: { value: 'abc' } });

		await waitFor(() => {
			expect(mockOnSearch).toHaveBeenCalledWith('abc');
		});
	});

	it('should not call onSearch if validation error exists', async () => {
		render(<SearchBar onSearch={mockOnSearch} />);

		const input = screen.getByPlaceholderText('Search Art, Artist, Work...');
		fireEvent.change(input, { target: { value: 'ab' } });

		await waitFor(() => {
			expect(mockOnSearch).not.toHaveBeenCalled();
		});
	});

	it('should update input value on change', () => {
		render(<SearchBar onSearch={mockOnSearch} />);

		const input = screen.getByPlaceholderText('Search Art, Artist, Work...');
		fireEvent.change(input, { target: { value: 'test' } });

		expect(input).toHaveValue('test');
	});
});
