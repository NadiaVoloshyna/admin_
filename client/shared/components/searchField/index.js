import React from 'react';
import _debounce from 'lodash/debounce';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import Input from 'shared/components/input';

import styles from './index.module.scss';

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
    <Input
      type="search"
      className={styles.searchField}
      placeholder="Search"
      onChange={onSearchChange}
      defaultValue={searchTerm}
      size="lg"
      prepend={{
        icon: 'search',
      }}
    />
  );
};

export default SearchField;
