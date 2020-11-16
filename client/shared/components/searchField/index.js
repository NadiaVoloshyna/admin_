import React from 'react';
import _debounce from 'lodash/debounce';
import Form from 'react-bootstrap/Form';
import useListDataFetch from 'shared/hooks/useListDataFetch';

const SearchField = () => {
  const { addQueryParams, removeQueryParam, getQueryParams } = useListDataFetch();
  const searchTerm = getQueryParams('q');

  // Debouncing getting new users set after search
  const debouncedSearch = _debounce((searchTerm) => {
    if (!searchTerm) return removeQueryParam('q');
    addQueryParams('q', searchTerm);
  }, 700);

  /**
   * Sets search term
   * @param {Object} event syntetic event
   */
  const onSearchChange = (event) => debouncedSearch(event.target.value);

  return (
    <Form.Control
      type="search"
      placeholder="Search"
      onChange={onSearchChange}
      value={searchTerm}
    />
  );
};

export default SearchField;
