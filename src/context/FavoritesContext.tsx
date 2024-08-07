import {
	JSX,
	createContext,
	ReactNode,
	useContext,
	useState,
	useEffect,
} from 'react';

import { Art } from '../constants/api.ts';

type FavoritesContextProps = {
	favorites: Art[];
	toggleFavorite: (art: Art) => void;
};

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
	undefined,
);

const useFavorites = (): FavoritesContextProps => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error('useFavorites must be used within a FavoritesProvider');
	}
	return context;
};

const FavoritesProvider = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	const [favorites, setFavorites] = useState<Art[]>(() => {
		const savedFavorites = sessionStorage.getItem('favorites');
		if (savedFavorites) {
			try {
				return JSON.parse(savedFavorites);
			} catch (error) {
				console.error('Error parsing favorites from sessionStorage', error);
				return [];
			}
		}
		return [];
	});

	useEffect(() => {
		sessionStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);

	const toggleFavorite = (art: Art) => {
		setFavorites((prev) => {
			const isFavorite = prev.some((el) => el.id === art.id);
			return isFavorite
				? prev.filter((el) => el.id !== art.id)
				: [...prev, art];
		});
	};

	return (
		<FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
};

export { useFavorites, FavoritesProvider };
