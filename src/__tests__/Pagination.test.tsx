import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from 'components/Pagination/Pagination.tsx';

describe('Pagination', () => {
	const mockOnPageChange = jest.fn();

	beforeEach(() => {
		mockOnPageChange.mockClear();
	});

	it('should render the correct number of page numbers', () => {
		render(
			<Pagination
				currentPage={1}
				totalPages={10}
				onPageChange={mockOnPageChange}
			/>,
		);

		const pageNumbers = screen.getAllByText(/^\d+$/);
		expect(pageNumbers).toHaveLength(4);
	});

	it('should highlight the current page number', () => {
		render(
			<Pagination
				currentPage={3}
				totalPages={10}
				onPageChange={mockOnPageChange}
			/>,
		);

		const currentPageNumber = screen.getByText('3');
		expect(currentPageNumber).toHaveClass('selected');
	});

	it('should call onPageChange when a page number is clicked', () => {
		render(
			<Pagination
				currentPage={1}
				totalPages={10}
				onPageChange={mockOnPageChange}
			/>,
		);

		fireEvent.click(screen.getByText('2'));
		expect(mockOnPageChange).toHaveBeenCalledWith(2);
	});

	it('should navigate to the previous set of pages', () => {
		render(
			<Pagination
				currentPage={6}
				totalPages={10}
				onPageChange={mockOnPageChange}
			/>,
		);

		fireEvent.click(screen.getByAltText('Arrow Right'));
		fireEvent.click(screen.getByAltText('Arrow Left'));

		const pageNumbers = screen.getAllByText(/^\d+$/);
		expect(pageNumbers).toHaveLength(4);
		expect(pageNumbers[0]).toHaveTextContent('1');
	});

	it('should navigate to the next set of pages', () => {
		render(
			<Pagination
				currentPage={1}
				totalPages={10}
				onPageChange={mockOnPageChange}
			/>,
		);

		fireEvent.click(screen.getByAltText('Arrow Right'));

		const pageNumbers = screen.getAllByText(/^\d+$/);
		expect(pageNumbers[0]).toHaveTextContent('5');
	});

	it('should not show the previous arrow on the first set of pages', () => {
		render(
			<Pagination
				currentPage={1}
				totalPages={10}
				onPageChange={mockOnPageChange}
			/>,
		);

		const leftArrow = screen.queryByAltText('Arrow Left');
		expect(leftArrow).not.toBeInTheDocument();
	});

	it('should not show the next arrow on the last set of pages', () => {
		render(
			<Pagination
				currentPage={1}
				totalPages={10}
				onPageChange={mockOnPageChange}
			/>,
		);

		fireEvent.click(screen.getByAltText('Arrow Right'));
		fireEvent.click(screen.getByAltText('Arrow Right'));

		const rightArrow = screen.queryByAltText('Arrow Right');
		expect(rightArrow).not.toBeInTheDocument();
	});
});
