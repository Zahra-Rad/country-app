interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationProps) {
  return (
    <div className="mt-4 flex justify-between items-center">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
      >
        Next
      </button>
    </div>
  );
} 