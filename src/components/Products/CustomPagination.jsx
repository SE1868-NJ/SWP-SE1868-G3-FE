import React from 'react';
import { Pagination } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination className="mt-3 justify-content-center">
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </Pagination.Prev>
      {[...Array(totalPages).keys()].map((num) =>
        num + 1 <= currentPage + 2 && num + 1 >= currentPage - 2 ? (
          <Pagination.Item
            key={num + 1}
            active={num + 1 === currentPage}
            onClick={() => onPageChange(num + 1)}
          >
            {num + 1}
          </Pagination.Item>
        ) : null
      )}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </Pagination.Next>
    </Pagination>
  );
};

export default CustomPagination;