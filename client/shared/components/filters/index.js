import { object, shape, string } from 'prop-types';
import React from 'react';
import Pills from 'shared/components/pills';
import useListDataFetch from 'shared/hooks/useListDataFetch';

const Filters = ({ items, name }) => {
  const { toggleQueryParams, removeQueryParam, getQueryParams } = useListDataFetch();

  const pillsItems = Object.values(items);
  const param = getQueryParams(name);
  const selected = items[param];

  const onSelect = (value) => {
    const [key] = Object.entries(items).find(item => item[1] === value);

    if (key === 'all') {
      removeQueryParam(name);
    } else {
      toggleQueryParams({ [name]: key });
    }
  };

  return (
    <Pills
      wide
      items={pillsItems}
      onSelect={onSelect}
      selected={selected}
    />
  );
};

Filters.propTypes = {
  items: shape(object).isRequired,
  name: string.isRequired,
};

export default Filters;
