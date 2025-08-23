'use client';

import { useQueryStates } from 'nuqs';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sortOptions, sortParser } from '@/features/ticket/search-params';

type Option = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortSelectProps = {
  options: Option[];
};

const SortSelect = ({ options }: SortSelectProps) => {
  // const [sort, setSort] = useQueryState('sort', sortParser);
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);
  //   const pathname = usePathname();
  //   const { replace } = useRouter();
  //   const searchParams = useSearchParams();

  // Set current url with search params like /tickets?search=value
  const handleSort = (compositeKey: string) => {
    // const params = new URLSearchParams(searchParams);

    // if (value === defaultValue) {
    //   params.delete('sort');
    // } else if (value) {
    //   params.set('sort', value);
    // } else {
    //   params.delete('sort');
    // }

    // replace(`${pathname}?${params.toString()}`, { scroll: false });
    // const sortValue = options.find(
    //   (option) => option.sortKey === sortKey
    // )?.sortValue;
    const [sortKey, sortValue] = compositeKey.split('_');
    setSort({ sortKey, sortValue });
  };

  return (
    <Select
      defaultValue={sort.sortKey + '_' + sort.sortValue}
      onValueChange={handleSort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + '_' + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
