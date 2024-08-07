import React, { JSX, useMemo, useState } from 'react';

import './Pagination.scss';

import arrowLeft from 'assets/ArrowLeft.svg';
import arrowRight from 'assets/ArrowRight.svg';

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

const Pagination = ({
	currentPage,
	totalPages = 10,
	onPageChange,
}: PaginationProps): JSX.Element => {
	const [offset, setOffset] = useState(0);
	const pagesPerSet = 4;

	const pages = useMemo(() => {
		const pagesLength = Math.min(pagesPerSet, totalPages - offset);
		return Array.from({ length: pagesLength }).map((_, i) => i + 1 + offset);
	}, [offset, totalPages]);

	const handlePrev = () => {
		setOffset((prev) => Math.max(prev - pagesPerSet, 0));
	};

	const handleNext = () => {
		setOffset((prev) => prev + pagesPerSet);
	};

	return (
		<div className="pagination-wrapper">
			{offset > 0 && (
				<img src={arrowLeft} onClick={handlePrev} alt="Arrow Left" />
			)}
			<div className="page-numbers">
				{pages.map((page, index) => (
					<div
						className={`page-number ${page === currentPage ? 'selected' : ''}`}
						onClick={() => onPageChange(page)}
						key={index}
					>
						{page}
					</div>
				))}
			</div>
			{offset + pagesPerSet < totalPages && (
				<img src={arrowRight} onClick={handleNext} alt="Arrow Right" />
			)}
		</div>
	);
};

export default React.memo(Pagination);
