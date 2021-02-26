import React from 'react';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import Pills from 'shared/components/pills';

const PAGES = ['10', '20', '50'];

const Pager = () => {
  const { toggleQueryParams, getQueryParams } = useListDataFetch();
  const limit = getQueryParams('limit');
  const onSelect = (value) => toggleQueryParams({ limit: value });

  return (
    <div className="d-flex align-items-center">
      <span className="mr-2">Items per sheet: </span>
      <Pills
        items={PAGES}
        selected={limit}
        onSelect={onSelect}
      />
    </div>
  );
};

export default Pager;
