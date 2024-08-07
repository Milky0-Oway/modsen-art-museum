import React, { ChangeEvent, JSX } from 'react';

import './SortDropdown.scss';

type SortDropdownProps = {
	sortCriteria: string;
	setSortCriteria: (sortCriteria: string) => void;
};

const SortDropdown = ({
	sortCriteria,
	setSortCriteria,
}: SortDropdownProps): JSX.Element => {
	const onSortDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSortCriteria(e.target.value);
	};

	return (
		<div className="sort-dropdown" data-testid="sort-dropdown">
			<label htmlFor="sort">Sort by</label>
			<select id="sort" value={sortCriteria} onChange={onSortDropdownChange}>
				<option value="default">Default</option>
				<option value="date">First Updated</option>
				<option value="date_reverse">Last Updated</option>
				<option value="alphabet">A to Z</option>
				<option value="alphabet_reverse">Z to A</option>
			</select>
		</div>
	);
};

export default React.memo(SortDropdown);
