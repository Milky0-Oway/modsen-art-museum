import React, { JSX, useEffect, useState } from 'react';

import SmallCard from '../SmallCard/SmallCard.tsx';
import SectionName from '../SectionName/SectionName.tsx';

import { useFavorites } from '../../context/FavoritesContext.tsx';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.tsx';

const FavoritesList = (): JSX.Element => {
	const { favorites } = useFavorites();
	const [isEmpty, setIsEmpty] = useState<boolean>(true);

	useEffect(() => {
		setIsEmpty(favorites.length === 0);
	}, [favorites]);

	return (
		<ErrorBoundary>
			<div className="small-card-list-wrapper">
				{!isEmpty ? (
					<div className="small-card-list">
						{favorites.map((art) => (
							<SmallCard item={art} key={art.id} />
						))}
					</div>
				) : (
					<SectionName
						title={'No favorites yet :('}
						subtitle={'Add something'}
					/>
				)}
			</div>
		</ErrorBoundary>
	);
};

export default React.memo(FavoritesList);
