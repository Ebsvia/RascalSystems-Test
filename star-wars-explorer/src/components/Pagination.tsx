interface PaginationProps {
    page: number;
    hasNext: boolean;
    hasPrevious: boolean;
    onPageChange: (newPage: number) => void;
  }
  
  export default function Pagination({ page, hasNext, hasPrevious, onPageChange }: PaginationProps) {
    return (
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevious}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">Page {page}</span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  }
  