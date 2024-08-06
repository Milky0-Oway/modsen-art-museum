import { JSX, useEffect, useState } from 'react';

import './CardList.scss';
import { Art, getData } from '../../constants/api.ts';
import Card from '../Card/Card.tsx';
import Loader from '../Loader/Loader.tsx';
import Pagination from '../Pagination/Pagination.tsx';

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

	return (
		<div className="card-list-wrapper">
			{!loading ? (
				<div>
					<div className="card-list">
						{data.map((art) => (
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
				<Loader />
			)}
		</div>
	);
};

export default CardList;
