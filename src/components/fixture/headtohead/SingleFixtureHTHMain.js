import { Link } from 'react-router-dom';
import { useReducer, useEffect, useCallback } from 'react';
import getFormattedDate from '../../../functions/getFormattedDate';
import useApiCalls from '../../../hooks/useApiCalls';
import Error from '../../UI/Error';
import Loading from '../../UI/Loading';
import classes from '../SingleFixtureClasses.module.css';
import hthClasses from './SingleFixtureHeadToHead.module.css';
import hoverClasses from '../../homebody/fixtures/LiveScoreFixture.module.css';
import SingleFixtureHeadToHeadLeague from './SingleFixtureHTHLeagueName';
import LiveScoreTeam from '../../homebody/fixtures/LiveScoreTeam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const hthReducer = (state, action) => {
  if (action.type === 'UPDATE_FIXTURES') {
    return { fixtures: action.value, pagination: state.pagination };
  }
  if (action.type === 'UPDATE_PAGINATION') {
    return {
      fixtures: state.fixtures,
      pagination: state.pagination + action.value,
    };
  }
};

const SingleFixtureHeadToHeadMain = ({
  url,
  query,
  paginationVal,
  team = null,
  teamId = null,
}) => {
  const [hthState, hthDispatch] = useReducer(hthReducer, {
    fixture: [],
    pagination: paginationVal,
  });

  const updateData = useCallback((data) => {
    hthDispatch({ type: 'UPDATE_FIXTURES', value: data.response });
  }, []);

  const { sendRequest, isLoading, error } = useApiCalls(updateData);

  useEffect(() => {
    sendRequest(url, `${query}${hthState?.pagination}`);
  }, [sendRequest, url, query, hthState?.pagination]);

  const controlPagination = () => {
    hthDispatch({ type: 'UPDATE_PAGINATION', value: paginationVal });
  };

  return (
    <>
      {error && <Error message={error} />}
      {isLoading && <Loading />}
      {!error && !isLoading && hthState?.fixtures && (
        <div>
          <div
            className={`${classes.halfTime} ${hthClasses.separateMargin} flexRowSpace ${classes.paddingEl} statsMargin`}
          >
            <p>{team ? `${team} - Last Fixtures` : 'Head to Head Fixtures'}</p>
          </div>
          <div className="flexColumn">
            {hthState.fixtures.map((fixture) => {
              let winnerCtx;

              const foundTeam =
                fixture.teams.home.id === teamId
                  ? fixture.teams.home
                  : fixture.teams.away;

              const isHomeTeam = fixture.teams.home.id === teamId;

              if (teamId) {
                winnerCtx = foundTeam.winner ? (
                  <div className={`greenBkg flexRow ${hthClasses.winnerD}`}>
                    W
                  </div>
                ) : (
                  <div className={`redBkg flexRow ${hthClasses.winnerD}`}>
                    L
                  </div>
                );
                if (foundTeam.winner === null)
                  winnerCtx = (
                    <div className={`drawBkg flexRow ${hthClasses.winnerD}`}>
                      D
                    </div>
                  );
              }

              return (
                <Link
                  to={`/fixtures/${fixture.fixture.id}`}
                  className="statsMargin width--max"
                  key={fixture.fixture.id}
                >
                  <div
                    key={fixture.fixture.id}
                    className={`${classes.fixtureEventWrapper} ${classes.paddingEl} ${hthClasses.gap} ${hoverClasses.liveScoreFixture}  flexRowCenter`}
                  >
                    <div>
                      <p>{getFormattedDate(fixture.fixture.date)}</p>
                    </div>
                    <div>
                      <div
                        className={`${hthClasses.separationLine} boxBkg`}
                      ></div>
                    </div>

                    <SingleFixtureHeadToHeadLeague
                      leagueName={fixture.league.name}
                      leagueFlag={fixture.league.flag}
                    />

                    <div className={`flexColumn ${hthClasses.team}`}>
                      {teamId ? (
                        <>
                          <LiveScoreTeam
                            logo={fixture.teams.home.logo}
                            name={fixture.teams.home.name}
                            halfTimeGoals={fixture.score.halftime?.home}
                            goals={fixture.goals.home}
                            winner={fixture.teams.home.winner}
                            selectedTeam={isHomeTeam}
                            isFinished={true}
                          />
                          <LiveScoreTeam
                            logo={fixture.teams.away.logo}
                            name={fixture.teams.away.name}
                            halfTimeGoals={fixture.score.halftime?.away}
                            goals={fixture.goals.away}
                            winner={fixture.teams.away.winner}
                            selectedTeam={!isHomeTeam}
                            isFinished={true}
                          />
                        </>
                      ) : (
                        <>
                          <LiveScoreTeam
                            logo={fixture.teams.home.logo}
                            name={fixture.teams.home.name}
                            halfTimeGoals={fixture.score.halftime?.home}
                            goals={fixture.goals.home}
                            winner={fixture.teams.home.winner}
                            isFinished={true}
                          />
                          <LiveScoreTeam
                            logo={fixture.teams.away.logo}
                            name={fixture.teams.away.name}
                            halfTimeGoals={fixture.score.halftime?.away}
                            goals={fixture.goals.away}
                            winner={fixture.teams.away.winner}
                            isFinished={true}
                          />
                        </>
                      )}
                    </div>
                    {teamId && (
                      <div>
                        <div
                          className={`${hthClasses.separationLine} boxBkg`}
                        ></div>
                      </div>
                    )}
                    {teamId && winnerCtx}
                  </div>
                </Link>
              );
            })}
          </div>
          <button
            onClick={controlPagination}
            className={hthClasses.loadMoreBtn}
          >
            Load More <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      )}
    </>
  );
};

export default SingleFixtureHeadToHeadMain;
