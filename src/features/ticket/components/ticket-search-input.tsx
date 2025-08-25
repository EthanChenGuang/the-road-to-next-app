'use client';

import { useQueryState } from 'nuqs';

import { SearchInput } from '@/components/search-input';

import { searchParser } from '../search-params';

type TicketSearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState('search', searchParser);

  // const [pagination, setPagination] = useQueryStates(
  //   paginationParser,
  //   paginationOptions
  // );

  // const handleSearch = (value: string) => {
  //   setSearch(value);
  //   setPagination({ ...pagination, page: 0 });
  // };

  return (
    <SearchInput
      key={search} // Force re-render when search value changes
      value={search}
      // onChange={handleSearch}
      onChange={setSearch}
      placeholder={placeholder}
    />
  );
};

export { TicketSearchInput };
