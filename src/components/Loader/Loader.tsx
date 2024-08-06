import { JSX } from 'react';

import './Loader.scss';

const Loader = (): JSX.Element => {
	return (
		<ul className="loader">
			<li className="dot"></li>
			<li className="dot"></li>
			<li className="dot"></li>
			<li className="dot"></li>
			<li className="dot"></li>
		</ul>
	);
};

export default Loader;
