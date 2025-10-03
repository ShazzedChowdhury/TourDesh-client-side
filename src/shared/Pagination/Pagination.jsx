import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [ ...Array(totalPages).keys() ].map( n => n + 1)
  
    return (
      <div className="flex justify-center mt-6 gap-2">
        {/* Prev Button */}
        <button
          className="btn btn-sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${
              page === currentPage ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="btn btn-sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
};

export default Pagination;