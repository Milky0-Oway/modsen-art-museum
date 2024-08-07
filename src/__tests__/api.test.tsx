import {
	URL_PAGE,
	URL_IMAGE,
	URL_SEARCH,
	URL_ART,
	getData,
	getArt,
} from 'constants/api';

describe('API URL functions', () => {
	test('URL_PAGE generates correct URL', () => {
		expect(URL_PAGE({ currentPage: 1, limit: 10 })).toBe(
			'https://api.artic.edu/api/v1/artworks?page=1&limit=10',
		);
		expect(URL_PAGE({ currentPage: 2 })).toBe(
			'https://api.artic.edu/api/v1/artworks?page=2&limit=undefined',
		);
		expect(URL_PAGE({ limit: 5 })).toBe(
			'https://api.artic.edu/api/v1/artworks?page=undefined&limit=5',
		);
	});

	test('URL_IMAGE generates correct URL', () => {
		expect(URL_IMAGE({ imageId: '12345' })).toBe(
			'https://www.artic.edu/iiif/2/12345/full/843,/0/default.jpg',
		);
		expect(URL_IMAGE({ imageId: '' })).toBe('');
		expect(URL_IMAGE({})).toBe('');
	});

	test('URL_SEARCH generates correct URL', () => {
		expect(URL_SEARCH({ searchData: 'Mona Lisa' })).toBe(
			'https://api.artic.edu/api/v1/artworks/search?q=Mona Lisa&limit=9',
		);
		expect(URL_SEARCH({ searchData: '' })).toBe('');
		expect(URL_SEARCH({})).toBe('');
	});

	test('URL_ART generates correct URL', () => {
		expect(URL_ART({ artId: 1 })).toBe(
			'https://api.artic.edu/api/v1/artworks/1',
		);
		expect(URL_ART({ artId: '2' })).toBe(
			'https://api.artic.edu/api/v1/artworks/2',
		);
	});
});

describe('API data fetching functions', () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('getData fetches and returns data', async () => {
		const mockResponse = { data: [], total: 0 };
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: jest.fn().mockResolvedValueOnce(mockResponse),
		});

		const result = await getData(1, 10);
		expect(fetch).toHaveBeenCalledWith(
			'https://api.artic.edu/api/v1/artworks?page=1&limit=10',
		);
		expect(result).toEqual(mockResponse);
	});

	test('getData throws error on fetch failure', async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			statusText: 'Not Found',
		});

		await expect(getData(1, 10)).rejects.toThrow(
			'Error fetching data: Not Found',
		);
	});

	test('getArt fetches and returns art data', async () => {
		const mockArtResponse = { data: { id: 1, title: 'Artwork Title' } };
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: jest.fn().mockResolvedValueOnce(mockArtResponse),
		});

		const result = await getArt(1);
		expect(fetch).toHaveBeenCalledWith(
			'https://api.artic.edu/api/v1/artworks/1',
		);
		expect(result).toEqual(mockArtResponse);
	});

	test('getArt throws error on fetch failure', async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			statusText: 'Not Found',
		});

		await expect(getArt(1)).rejects.toThrow('Error fetching art: Not Found');
	});
});
