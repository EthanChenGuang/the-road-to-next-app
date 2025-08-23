// export type SearchParams = {
//   search?: string | string[] | undefined;
//   sort?: string | string[] | undefined;
// };

// * `?search=hello` (string)
// * `?search[]=hello&search[]=world` (array)
// * `?search` (undefined)

import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const searchParser = parseAsString.withDefault('').withOptions({
  shallow: false,
  clearOnDefault: true,
});

// export const sortParser = parseAsString.withDefault('newest').withOptions({
//   shallow: false,
//   clearOnDefault: true,
// });

export const sortParser = {
  sortKey: parseAsString.withDefault('createdAt'),
  sortValue: parseAsString.withDefault('desc'),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  // sort: sortParser,
  ...sortParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
