import { useEffect, useCallback } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import useApiCalls from '../hooks/useApiCalls';
import jsonFixture from '../json/json-singlefixture.json';

import { useSelector, useDispatch } from 'react-redux';
import { singleFixtureActions } from '../store/singlefixture-slice';

import { shouldFetch } from '../global_variables';

import classes from './SingleFixture.module.css';

import SingleFixtureCard from '../components/UI/SingleFixtureCard';
import LeagueHeader from '../components/reusable/LeagueHeader';
import FixtureTeamsScoreTime from '../components/fixture/FixtureTeamsScoreTime';
import SingleFixtureNavigation from '../components/fixture/SingleFixtureNavigation';
import SingleFixtureSummary from '../components/fixture/summary/SingleFixtureSummary';
import SingleFixtureAdditionalInfo from '../components/fixture/SingleFixtureAdditionalInfo';
import Loading from '../components/UI/Loading';
import Error from '../components/UI/Error';

const SingleFixture = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const singleFixture = useSelector((state) => state.fixture.selectedFixture);

  const params = useParams().fixtureId;

  const handlePlayerData = useCallback(
    (data) => {
      const [fixtureData] = data.response;

      dispatch(
        singleFixtureActions.updateSelectedFixture({ fixture: fixtureData })
      );

      dispatch(
        singleFixtureActions.updateTeamsInfo({
          homeTeam: fixtureData.teams.home.name,
          awayTeam: fixtureData.teams.away.name,
          homeId: fixtureData.teams.home.id,
          awayId: fixtureData.teams.away.id,
          leagueInfo: {
            id: fixtureData.league.id,
            season: fixtureData.league.season,
          },
        })
      );
    },
    [dispatch]
  );

  const { sendRequest, isLoading, error } = useApiCalls(handlePlayerData);
  const { sendRequest: sendRequestRepetable } = useApiCalls(handlePlayerData);

  //Initial fixture Load:
  useEffect(() => {
    dispatch(singleFixtureActions.initializeGoalEvents());
    sendRequest('https://v3.football.api-sports.io/fixtures/', `id=${params}`);
  }, [sendRequest, params, dispatch]);

  //Repetable fixture fetching:
  useEffect(() => {
    if (shouldFetch) {
      const fetchTimer = setInterval(() => {
        sendRequestRepetable(
          'https://v3.football.api-sports.io/fixtures/',
          `id=${params}`
        );
      }, 60 * 1000);

      return () => {
        clearInterval(fetchTimer);
      };
    }
  });

  return (
    <main className="container marginTop">
      <SingleFixtureCard>
        {isLoading && <Loading />}
        {!isLoading && singleFixture?.fixture && !error && (
          <>
            <LeagueHeader
              leagueInfo={singleFixture.league}
              className={classes.leagueHeader}
            />
            <div className={classes.separationLine}></div>
            <FixtureTeamsScoreTime />
          </>
        )}
        {error && <Error message={error} />}
        <div className={classes.fixtureInfoWrapper}>
          <SingleFixtureNavigation params={params} />
          {location.pathname === `/fixtures/${params}` &&
            singleFixture?.fixture && <SingleFixtureSummary />}
          <Outlet />
        </div>
        <div className={classes.fixtureInfoWrapper}>
          <SingleFixtureAdditionalInfo></SingleFixtureAdditionalInfo>
        </div>
      </SingleFixtureCard>
    </main>
  );
};

export default SingleFixture;
