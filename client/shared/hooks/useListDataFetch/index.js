import { useContext } from 'react';
import { useRouter } from 'next/router';
import _pull from 'lodash/pull';
import { PageContext } from 'shared/context';

const useListDataFetch = () => {
  const { setIsLoading } = useContext(PageContext);
  const router = useRouter();
  const { pathname, query } = router;

  const addQueryParams = async (key, value) => {
    setIsLoading(true);

    if (typeof value === 'undefined' && typeof query[key] !== 'undefined') {
      delete query[key];
    } else {
      query[key] = Array.isArray(value)
        ? value.join(',')
        : value;
    }

    await router.push({
      pathname,
      query,
    });

    setIsLoading(false);
  };

  const getQueryParams = (param) => {
    return router.query[param];
  };

  const removeQueryParam = (param, value) => {
    const { query } = router;

    if (!query[param]) return;

    if (!value || query[param] === value) {
      return addQueryParams(param);
    }

    const currentValues = query[param].split(',');
    let updatedValues = _pull(currentValues, value);
    updatedValues = updatedValues.length > 1
      ? updatedValues.join(',')
      : updatedValues;

    addQueryParams(param, updatedValues);
  };

  const refetchQuery = async () => {
    await router.replace({
      pathname: router.pathname,
      query: router.query,
    });
  };

  return {
    addQueryParams,
    getQueryParams,
    removeQueryParam,
    refetchQuery,
  };
};

export default useListDataFetch;
