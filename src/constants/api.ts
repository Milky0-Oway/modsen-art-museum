type UrlProps = {
  currentPage: number;
  limit: number;
  imageId: string;
  searchData: string;
  artId: number | string;
};

export const URL_PAGE = ({ currentPage, limit }: Partial<UrlProps>) =>
  `https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${limit}`;
export const URL_IMAGE = ({ imageId }: Partial<UrlProps>) =>
  `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
export const URL_SEARCH = ({ searchData }: Partial<UrlProps>) =>
  `https://api.artic.edu/api/v1/artworks/search?q=${searchData}&limit=9`;
export const URL_ART = ({ artId }: Partial<UrlProps>) =>
  `https://api.artic.edu/api/v1/artworks/${artId}`;

export type Art = {
  id: number | string;
  title: string;
  artist_title: string;
  is_public_domain: boolean;
  date_start: number;
  date_end: number;
  place_of_origin: string;
  dimensions: string;
  credit_line: string;
  image_id: string;
};

type Response = {
  data: Art[];
  total: number;
};

type ArtResponse = {
  data: Art;
};

export const getData = async (
  currentPage: number,
  limit: number,
): Promise<Response> => {
  const response = await fetch(URL_PAGE({ currentPage, limit }));
  return response.json();
};

export const getArt = async (id: number | string): Promise<ArtResponse> => {
  const response = await fetch(URL_ART({ artId: id }));
  return response.json();
};
