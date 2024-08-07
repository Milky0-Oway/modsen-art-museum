import { useEffect, RefObject, useCallback } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		},
		[ref, callback],
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);
};

export default useOutsideClick;
