import { Button } from '@/components/ui/button';
import { PaginatedData } from '@/types/pagination';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  // paginatedMetadata: {
  //   total: number;
  //   hasNextPage: boolean;
  // };
  paginatedMetadata: PaginatedData<unknown>['metadata'];
};

const Pagination = ({
  pagination,
  onPagination,
  paginatedMetadata,
}: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset + pagination.size - 1;
  // For cursor-based pagination, we don't have total count
  const hasTotal = 'total' in paginatedMetadata;
  const actualEndOffset = hasTotal ? Math.min(endOffset, paginatedMetadata.total as number) : endOffset;
  const label = hasTotal
    ? `${startOffset} - ${actualEndOffset} of ${paginatedMetadata.total}`
    : `Page ${pagination.page + 1}`;

  const handlePreviousPage = () => {
    onPagination({ ...pagination, page: pagination.page - 1 });
  };

  const handleNextPage = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };

  const handleSizeChange = (size: string) => {
    onPagination({ page: 0, size: parseInt(size) });
  };

  const sizeButton = (
    <Select
      onValueChange={handleSizeChange}
      defaultValue={pagination.size.toString()}
    >
      <SelectTrigger className="h-[36px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );

  const previousButton = (
    <Button
      onClick={handlePreviousPage}
      disabled={pagination.page === 0}
      variant="outline"
      size="sm"
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      onClick={handleNextPage}
      disabled={!paginatedMetadata.hasNextPage}
      variant="outline"
      size="sm"
    >
      Next
    </Button>
  );

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {sizeButton}
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};

export { Pagination };
