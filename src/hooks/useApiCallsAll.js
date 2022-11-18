import { useState, useCallback } from 'react';
import getJSON from '../functions/getJSON';

const useApiCallsAll = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(
    async function () {
      try {
        const promiseDataArr = Array.from(arguments);

        setIsLoading(true);

        const data = await Promise.all(
          promiseDataArr.map((promiseData) =>
            getJSON(promiseData.url, promiseData.queryParam)
          )
        );

        applyData(data.map((dataNode) => dataNode.response));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    },
    [applyData]
  );

  return { fetchData, isLoading, error };
};

export default useApiCallsAll;
