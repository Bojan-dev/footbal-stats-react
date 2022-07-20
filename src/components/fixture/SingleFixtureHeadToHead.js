import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useApiCalls from '../../hooks/useApiCalls';

const SingleFixtureHeadToHead = () => {
  const [headToHeadData, setHeadToHeadData] = useState(null);
  const selectedFixture = useSelector((state) => state.fixture.selectedFixture);

  const homeTeamId = selectedFixture.teams.home.id;
  const awayTeamId = selectedFixture.teams.away.id;

  const updateHToHData = useCallback((data) => {
    setHeadToHeadData(data.response);
  }, []);

  const { sendRequest, isLoading, error } = useApiCalls(updateHToHData);

  useEffect(() => {
    sendRequest(
      'https://v3.football.api-sports.io/fixtures/headtohead/',
      `h2h=${homeTeamId}-${awayTeamId}`
    );
  }, [sendRequest, homeTeamId, awayTeamId]);

  console.log(headToHeadData);

  return <div>This is a head to head for the selected fixture!</div>;
};

export default SingleFixtureHeadToHead;
