export const PLAVE_URL = {
  HREF: 'https://cafe.daum.net/plave',
  HOST_NAME: 'cafe.daum.net',
  PATHNAME: 'plave',
};

export const CATEGORY_ID = {
  FROM_PLAVE: 'ab6O',
  CAELUM_TALK: 'apiE',
};

export type ParsedUrl = {
  host: string;
  pathName: string;
  categoryId: string;
  postId: string;
};

export const parseURL = (currentUrl: string | URL): ParsedUrl => {
  const url = new URL(currentUrl);
  const { host } = url;
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_, pathName, categoryId, postId] = url.pathname.split('/');
  return { host, pathName, categoryId, postId };
};
