const getJSON = (url, queryParam) => {
  return fetch(`${url}${queryParam ? `?${queryParam}` : ''}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': 'a0360f7a4d6543698d5650ab158449d7',
    },
  }).then((response) => {
    if (!response.ok) throw new Error('Something went wrong');

    return response.json();
  });
};

export default getJSON;
