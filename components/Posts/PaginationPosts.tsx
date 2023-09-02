import { motion } from "framer-motion";
import Link from "next/link";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <motion.div
      className="flex justify-center items-center py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 } }
      transition={{ duration: 0.5, delay: 0.1 }}>
      {currentPage > 1 && (
        <Link
        href={`?page=${currentPage - 1}`}
          // onClick={() => onPageChange(currentPage - 1)}
          className="mr-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
          Previous
        </Link>
      )}
      <span className="mx-2">
        {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
        href={`?page=${currentPage + 1}`}
          className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
          Next
        </Link>
      )}
    </motion.div>
  );
};

export default PaginationControls;
