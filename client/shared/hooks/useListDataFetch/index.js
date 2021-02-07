import { useContext } from 'react';
import { useRouter } from 'next/router';
import _omitBy from 'lodash/omitBy';
import _isNull from 'lodash/isNull';
import queryString from 'query-string';
import { PageContext } from 'shared/context';

const useListDataFetch = () => {
  const { setIsLoading } = useContext(PageContext);
  const router = useRouter();
  const { pathname, query } = router;

  const getQueryParams = (param, isArray) => {
    const query = router.query[param];

    if (!isArray) return query;

    return query ? query.split(',') : [];
  };

  const toggleQueryParams = async (params) => {
    setIsLoading(true);

    const newQuery = queryString.stringify(_omitBy({
      ...query,
      ...params,
    }, _isNull), { arrayFormat: 'comma' });

    await router.push({
      pathname,
      query: newQuery,
    });

    setIsLoading(false);
  };

  const removeQueryParam = (param) => {
    toggleQueryParams({ [param]: null });
  };

  const refetchQuery = async () => {
    await router.replace({
      pathname: router.pathname,
      query: router.query,
    });
  };

  return {
    getQueryParams,
    removeQueryParam,
    refetchQuery,
    toggleQueryParams,
  };
};

export default useListDataFetch;
