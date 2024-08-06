import { ChangeEvent, JSX, useEffect } from 'react';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

import useDebounce from '../../utils/useDebounce.ts';

import './SearchBar.scss';

type SearchBarProps = {
	onSearch: (searchData: string) => void;
};

const validationSchema = z.object({
	searchData: z
		.string()
		.min(3, 'Search data must be at least 3 characters long.')
		.nonempty('Search data is required.'),
});

const SearchBar = ({ onSearch }: SearchBarProps): JSX.Element => {
	const formik = useFormik({
		initialValues: {
			searchData: '',
		},
		validationSchema: toFormikValidationSchema(validationSchema),
		onSubmit: (values) => {
			onSearch(values.searchData);
		},
	});

	const debouncedValue = useDebounce(formik.values.searchData, 500);

	useEffect(() => {
		if (!formik.errors.searchData && debouncedValue.trim().length >= 3) {
			onSearch(debouncedValue);
		}
	}, [debouncedValue, formik.errors.searchData]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		formik.handleChange(e);
		if (e.target.value.trim().length < 3) {
			formik.setFieldError(
				'searchData',
				'Search data must be at least 3 characters long.',
			);
		} else {
			formik.setFieldError('searchData', '');
		}
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<div
				className="input-wrapper"
				data-error={
					formik.errors.searchData && formik.values.searchData
						? formik.errors.searchData
						: ''
				}
			>
				<input
					className="input"
					type="text"
					name="searchData"
					value={formik.values.searchData}
					onChange={handleChange}
					placeholder="Search Art, Artist, Work..."
				/>
				<div className="input-icon" onClick={() => formik.handleSubmit()}></div>
			</div>
		</form>
	);
};

export default SearchBar;
