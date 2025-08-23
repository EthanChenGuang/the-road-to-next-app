'use client';

import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  // const [search, setSearch] = useQueryState('search', searchParser);
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // Set current url with search params like /tickets?search=value
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // const value = e.target.value;
      // const params = new URLSearchParams(searchParams);

      // if (value) {
      //   params.set('search', value);
      // } else {
      //   params.delete('search');
      // }

      // replace(`${pathname}?${params.toString()}`, { scroll: false });
      // setSearch(e.target.value);
      onChange(e.target.value);
    },
    250
  );

  return (
    <Input
      placeholder={placeholder}
      // defaultValue={search}
      defaultValue={value}
      onChange={handleSearch}
    />
  );
};

export { SearchInput };
