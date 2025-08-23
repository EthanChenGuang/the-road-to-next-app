'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SortSelectOption = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  value: SortObject;
  onChange: (sort: SortObject) => void;
  options: SortSelectOption[];
};

const SortSelect = ({ value, onChange, options }: SortSelectProps) => {
  // const [sort, setSort] = useQueryState('sort', sortParser);
  // const [sort, setSort] = useQueryStates(sortParser, sortOptions);
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
    onChange({ sortKey, sortValue });
  };

  return (
    <Select
      defaultValue={value.sortKey + '_' + value.sortValue}
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
