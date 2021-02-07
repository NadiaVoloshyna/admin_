import React, { useState } from 'react';
import { number } from 'prop-types';
import _range from 'lodash/range';
import BootstrapPagination from 'react-bootstrap/Pagination';
import useListDataFetch from 'shared/hooks/useListDataFetch';

const definePages = (current, total) => {
  let startPage = current - 1;
  let endPage = current + 2;

  if (startPage <= 0) {
    endPage -= (startPage - 1);
    startPage = 1;
  }

  if (endPage > total) {
    endPage = total;
  }

  return { startPage, endPage };
};

const Pagination = ({ pages }) => {
  const { toggleQueryParams, getQueryParams } = useListDataFetch();
  const offset = parseInt(getQueryParams('offset') || 0);
  const [current, setCurrent] = useState(offset + 1);

  if (pages < 2) return null;

  const isPrevDisabled = current === 1;
  const isNextDisabled = current === pages;

  const { startPage, endPage } = definePages(current, pages);

  const navigate = (item) => {
    if (current === item) return;
    setCurrent(item);
    toggleQueryParams({ offset: item - 1 });
  };

  const onPrevClick = () => {
    navigate(current - 1);
  };

  const onNextClick = () => {
    navigate(current + 1);
  };

  const renderPages = () => {
    const visiblePages = _range(startPage, endPage + 1);

    return visiblePages.map(item => {
      const onClick = () => navigate(item);
      return (
        <BootstrapPagination.Item
          key={`pagination_${item}`}
          active={current === item}
          onClick={onClick}
        >{ item }</BootstrapPagination.Item>
      );
    });
  };

  return (
    <div className="d-flex align-items-center">
      <span>Pages: </span>

      <BootstrapPagination className="m-0">
        <BootstrapPagination.Prev
          disabled={isPrevDisabled}
          onClick={onPrevClick}
        />
        { startPage > 1 && <BootstrapPagination.Ellipsis disabled /> }
        { renderPages() }
        { (endPage < pages) && <BootstrapPagination.Ellipsis disabled /> }
        <BootstrapPagination.Next
          disabled={isNextDisabled}
          onClick={onNextClick}
        />
      </BootstrapPagination>
    </div>
  );
};

Pagination.propTypes = {
  pages: number.isRequired,
};

export default Pagination;
