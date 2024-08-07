import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortDropdown from 'components/SortDropdown/SortDropdown';

describe('SortDropdown component', () => {
	const mockSetSortCriteria = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders correctly', () => {
		render(
			<SortDropdown
				sortCriteria="default"
				setSortCriteria={mockSetSortCriteria}
			/>,
		);

		expect(screen.getByLabelText('Sort by')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'Default' })).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'First Updated' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'Last Updated' }),
		).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'A to Z' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'Z to A' })).toBeInTheDocument();
	});

	test('changes value and calls setSortCriteria on selection change', () => {
		render(
			<SortDropdown
				sortCriteria="default"
				setSortCriteria={mockSetSortCriteria}
			/>,
		);

		const select = screen.getByRole('combobox');

		fireEvent.change(select, { target: { value: 'date' } });
		expect(mockSetSortCriteria).toHaveBeenCalledWith('date');

		fireEvent.change(select, { target: { value: 'alphabet' } });
		expect(mockSetSortCriteria).toHaveBeenCalledWith('alphabet');
	});

	test('initial value is set correctly based on props', () => {
		render(
			<SortDropdown
				sortCriteria="alphabet"
				setSortCriteria={mockSetSortCriteria}
			/>,
		);

		expect(screen.getByRole('combobox')).toHaveValue('alphabet');
	});
});
