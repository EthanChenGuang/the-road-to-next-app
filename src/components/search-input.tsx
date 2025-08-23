'use client';

import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';
import { searchParser } from '@/features/ticket/search-params';

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState('search', searchParser);
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // Set current url with search params like /tickets?search=value
  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // const value = e.target.value;
      // const params = new URLSearchParams(searchParams);

      // if (value) {
      //   params.set('search', value);
      // } else {
      //   params.delete('search');
      // }

      // replace(`${pathname}?${params.toString()}`, { scroll: false });
      setSearch(e.target.value);
    },
    250
  );

  return (
    <Input
      placeholder={placeholder}
      defaultValue={search}
      onChange={handleChange}
    />
  );
};

export { SearchInput };
