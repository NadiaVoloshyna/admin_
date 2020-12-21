import React, { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';
import Form from 'react-bootstrap/Form';
import useListDataFetch from 'shared/hooks/useListDataFetch';

const SearchField = () => {
  const { addQueryParams, removeQueryParam, getQueryParams } = useListDataFetch();

  const initState = {
    searchTerm: getQueryParams('q'),
    reload: false,
  };
  const [state, setReload] = useState(initState);
  useEffect(() => {
    if (state.reload) {
      if (!state.searchTerm || state.searchTerm === '') {
        removeQueryParam('q');
      }
      addQueryParams('q', state.searchTerm);
    }
    return () => {};
  }, [state]);

  const callApi = (evt) => {
    setReload({
      ...state,
      searchTerm: evt.searchTerm,
      reload: true,
    });
  };

  const [debouncedCallApi] = useState(() => _debounce(callApi, 700));

  function handleChange(evt) {
    debouncedCallApi({ searchTerm: evt.target.value });
  }

  return <Form.Control type="search" placeholder="Search" onChange={handleChange} defaultValue={state.searchTerm} />;
};

export default SearchField;
