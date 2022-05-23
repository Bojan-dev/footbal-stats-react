import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useApiCalls from '../hooks/useApiCalls';
// import jsonFixture from '../json/json-singlefixture.json';

import SingleFixtureCard from '../components/UI/SingleFixtureCard';
import SingleFixtureInfo from '../components/fixture/SingleFixtureInfo';
import SingleFixtureStats from '../components/fixture/SingleFixtureStats';
import Loading from '../components/UI/Loading';
import Error from '../components/UI/Error';

const SingleFixture = () => {
  const [selectedFixture, setSelectedFixture] = useState({});
  const params = useParams().fixtureId;

  const handlePlayerData = useCallback((data) => {
    const [fixtureData] = data.response;

    setSelectedFixture(fixtureData);
  }, []);

  const { sendRequest, isLoading, error } = useApiCalls(handlePlayerData);
  const { sendRequest: sendRequestRepetable } = useApiCalls(handlePlayerData);

  //Initial fixture Load:
  useEffect(() => {
    sendRequest('https://v3.football.api-sports.io/fixtures/', `id=${params}`);
  }, [sendRequest, params]);

  //Repetable fixture fetching:
  useEffect(() => {
    const fetchTimer = setInterval(() => {
      sendRequestRepetable(
        'https://v3.football.api-sports.io/fixtures/',
        `id=${params}`
      );
    }, 60 * 1000);

    return () => {
      clearInterval(fetchTimer);
    };
  });

  return (
    <main className="container marginTop">
      <SingleFixtureCard>
        {isLoading && <Loading />}
        {!isLoading && selectedFixture?.fixture && !error && (
          <SingleFixtureInfo
            league={selectedFixture.league}
            teams={selectedFixture.teams}
            dateAndTime={selectedFixture.fixture.date}
            score={selectedFixture.goals}
            matchTime={selectedFixture.fixture.status.elapsed}
            fixtureStatus={selectedFixture.fixture.status.short}
          />
        )}
        {error && <Error message={error} />}
      </SingleFixtureCard>
      <SingleFixtureStats></SingleFixtureStats>
    </main>
  );
};

export default SingleFixture;
