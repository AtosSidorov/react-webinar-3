import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePages = () => {
    const pages = [];

    pages.push(1);

    if (currentPage === 1 || currentPage === 2) {
      pages.push(2, 3);
    } else if (currentPage === 3) {
      pages.push(2, 3, 4);
    }

    if (currentPage > 3) {
      pages.push('...');
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }

    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="pagination">
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="pagination-ellipsis">...</span>
          ) : (
            <button
              className={`pagination-item ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
