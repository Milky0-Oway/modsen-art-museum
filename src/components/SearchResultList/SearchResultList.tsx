import { JSX, useMemo, useState } from 'react';

import Loader from '../Loader/Loader.tsx';
import Card from '../Card/Card.tsx';

import { Art } from '../../constants/api.ts';

import './SearchResultList.scss';
import SortDropdown from '../SortDropdown/SortDropdown.tsx';

type SearchResultListProps = {
	loading: boolean;
	searchResult: Art[];
};

const SearchResultList = ({
	loading,
	searchResult,
}: SearchResultListProps): JSX.Element => {
	const [sortCriteria, setSortCriteria] = useState<string>('default');

	const sortedResult = useMemo(() => {
		return [...searchResult].sort((a, b) => {
			switch (sortCriteria) {
				case 'date':
					return (
						new Date(a.date_end).getTime() - new Date(b.date_end).getTime()
					);
				case 'date_reverse':
					return (
						new Date(b.date_end).getTime() - new Date(a.date_end).getTime()
					);
				case 'alphabet':
					return a.title.localeCompare(b.title);
				case 'alphabet_reverse':
					return b.title.localeCompare(a.title);
			}
			return 0;
		});
	}, [searchResult, sortCriteria]);

	return (
		<div className="search-result-wrapper">
			{!loading ? (
				<>
					<SortDropdown
						sortCriteria={sortCriteria}
						setSortCriteria={setSortCriteria}
					/>
					<div className="search-result-list">
						{sortedResult.map((item) => (
							<Card item={item} key={item.id} />
						))}
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default SearchResultList;
