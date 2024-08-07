import { JSX, useEffect, useMemo, useState } from 'react';

import Card from 'components/Card/Card.tsx';
import Loader from 'components/Loader/Loader.tsx';
import Pagination from 'components/Pagination/Pagination.tsx';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary.tsx';

import { Art, getData } from 'constants/api.ts';

import './CardList.scss';

const CardList = (): JSX.Element => {
	const [data, setData] = useState<Art[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const result = await getData(currentPage, 5);
				setData(result.data);
				setTotalPages(result.total);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [currentPage]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const memoizedData = useMemo(() => data, [data]);

	return (
		<ErrorBoundary>
			{!loading ? (
				<div className="card-list-wrapper">
					<div className="card-list" data-testid="card-list">
						{memoizedData.map((art) => (
							<Card item={art} key={art.id} />
						))}
					</div>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			) : (
				<Loader data-testid="loader" />
			)}
		</ErrorBoundary>
	);
};

export default CardList;
