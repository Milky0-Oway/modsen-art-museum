import { JSX, useEffect, useMemo, useState } from 'react';

import SmallCard from 'components/SmallCard/SmallCard.tsx';
import Loader from 'components/Loader/Loader.tsx';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary.tsx';

import { Art, getData } from 'constants/api.ts';

import './SmallCardList.scss';

const SmallCardList = (): JSX.Element => {
	const [data, setData] = useState<Art[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const result = await getData(11, 9);
				setData(result.data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const memoizedData = useMemo(() => data, [data]);

	return (
		<ErrorBoundary>
			<div className="small-card-list-wrapper">
				{!loading ? (
					<div className="small-card-list">
						{memoizedData.map((art) => (
							<SmallCard item={art} key={art.id} />
						))}
					</div>
				) : (
					<Loader />
				)}
			</div>
		</ErrorBoundary>
	);
};

export default SmallCardList;
