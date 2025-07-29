import React from 'react';

const Pagination = ({setPage, totalPages, page}) => {
    return (
      <div className="m-4 flex justify-center items-center gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded border ${
              page === idx + 1 ? "bg-primary text-white" : "bg-white"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    );
};

export default Pagination;