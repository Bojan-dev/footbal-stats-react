import { useState, useCallback } from 'react';

const useApiCalls = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('AAAAAAA');

  const sendRequest = useCallback(
    async (url, queryParams) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${url}${queryParams ? `?${queryParams}` : ''}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': 'a0360f7a4d6543698d5650ab158449d7',
            },
          }
        );

        if (!response.ok) throw new Error('Request failed!');

        const data = await response.json();

        applyData(data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [applyData]
  );

  return { sendRequest, isLoading, error };
};

export default useApiCalls;
