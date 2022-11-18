import { useEffect, useCallback, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../UI/Loading';
import Error from '../../UI/Error';
import { useSelector } from 'react-redux';
import SingleFixtureHeadToHeadNode from './SingleFixtureHeadToHeadNode';
import useApiCallsAll from '../../../hooks/useApiCallsAll';
import btnClasses from '../../homebody/LiveScoreFilters.module.css';
import hthFixtures from '../../../json/h2h-fixtures.json';
import homeFixtures from '../../../json/home-fixtures.json';
import awayFixtures from '../../../json/away-fixtures.json';

const initialState = {
  fixtures: [],
  pagination: 3,
};

const reducer = (state, action) => {
  if (action.type === 'UPDATE_FIXTURES') {
    return { pagination: state.pagination, fixtures: action.value };
  }
  if (action.type === 'UPDATE_PAGINATION')
    return { fixtures: state.fixtures, pagination: state.pagination + 3 };
};

const SingleFixtureHeadToHead = () => {
  const [hthState, dispatchHth] = useReducer(reducer, initialState);
  const [homeFixsState, dispatchHomeFixs] = useReducer(reducer, initialState);
  const [awayFixsState, dispatchAwayFixs] = useReducer(reducer, initialState);
  const homeTeamId = useSelector((state) => state.fixture.homeTeamId);
  const awayTeamId = useSelector((state) => state.fixture.awayTeamId);
  const homeTeam = useSelector((state) => state.fixture.homeTeam);
  const awayTeam = useSelector((state) => state.fixture.awayTeam);
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFetchedData = useCallback((data) => {
    dispatchHth({ type: 'UPDATE_FIXTURES', value: data[0] });
    dispatchHomeFixs({ type: 'UPDATE_FIXTURES', value: data[1] });
    dispatchAwayFixs({ type: 'UPDATE_FIXTURES', value: data[2] });
  }, []);

  const updateData = useCallback(() => {
    dispatchHth({ type: 'UPDATE_FIXTURES', value: hthFixtures.response });
    dispatchHomeFixs({ type: 'UPDATE_FIXTURES', value: homeFixtures.response });
    dispatchAwayFixs({ type: 'UPDATE_FIXTURES', value: awayFixtures.response });
  }, []);

  const { fetchData, isLoading, error } = useApiCallsAll(updateFetchedData);

  const handleParam = (e) => {
    const param = e.target.value;
    setSearchParams({ h2h: param });
  };

  const getParam = () => searchParams.get('h2h');

  useEffect(() => {
    updateData();
  }, [updateData]);

  useEffect(() => {
    fetchData(
      {
        url: 'https://v3.football.api-sports.io/fixtures/headtohead/',
        queryParam: `h2h=${homeTeamId}-${awayTeamId}&last=${3}`,
      },
      {
        url: 'https://v3.football.api-sports.io/fixtures/',
        queryParam: `team=${homeTeamId}&last=${3}`,
      },
      {
        url: 'https://v3.football.api-sports.io/fixtures/',
        queryParam: `team=${awayTeamId}&last=${3}`,
      }
    );
  }, [awayTeamId, homeTeamId, fetchData]);

  return (
    <>
      {error && <Error message={error} />}
      {isLoading && <Loading />}
      {!error &&
        !isLoading &&
        (homeTeamId || awayTeamId ? (
          <div className={`fixturePadding`}>
            <div
              className={`flexRowCenter ${btnClasses.filterCards} ${btnClasses.marginB}`}
            >
              <button
                value={'overall'}
                onClick={handleParam}
                className={
                  getParam() !== 'home' && getParam() !== 'away'
                    ? btnClasses.active
                    : ''
                }
              >
                Head to Head
              </button>
              <button
                value="home"
                onClick={handleParam}
                className={getParam() === 'home' ? btnClasses.active : ''}
              >
                {homeTeam}
              </button>
              <button
                value="away"
                onClick={handleParam}
                className={getParam() === 'away' ? btnClasses.active : ''}
              >
                {awayTeam}
              </button>
            </div>
            {getParam() !== 'home' && getParam() !== 'away' && (
              <>
                <SingleFixtureHeadToHeadNode fixtures={hthState.fixtures} />

                <SingleFixtureHeadToHeadNode
                  fixtures={homeFixsState.fixtures}
                  team={homeTeam}
                  teamId={homeTeamId}
                />
                <SingleFixtureHeadToHeadNode
                  fixtures={awayFixsState.fixtures}
                  team={awayTeam}
                  teamId={awayTeamId}
                />
              </>
            )}
            {getParam() === 'home' && (
              <SingleFixtureHeadToHeadNode
                fixtures={homeFixsState.fixtures}
                team={homeTeam}
                teamId={homeTeamId}
              />
            )}
            {getParam() === 'away' && (
              <SingleFixtureHeadToHeadNode
                fixtures={awayFixsState.fixtures}
                team={awayTeam}
                teamId={awayTeamId}
              />
            )}
          </div>
        ) : (
          <div className="fixturePadding">
            <h4 className="textColorMode">
              No Head to Head info for the selected fixture!
            </h4>
          </div>
        ))}
    </>
  );
};

export default SingleFixtureHeadToHead;
