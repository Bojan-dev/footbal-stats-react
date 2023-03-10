import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fixturesActions } from '../../store/fixtures-slice';
import { fetchFixturesData } from '../../store/fixtures-slice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import LiveFixture from './LiveFixture';

import classes from './FixedLiveResults.module.css';
import { shouldFetch } from '../../global_variables';

const FixedLiveResults = () => {
  const dispatch = useDispatch();

  const liveFixtures = useSelector((state) => state.fixtures.liveScores);

  const [showWindow, setShowWindow] = useState(true);
  const [liveFixturesLoaded, setLiveFixturesLoaded] = useState(false);

  const handleWindowVisibility = () => {
    setShowWindow((prevState) => !prevState);
  };

  useEffect(() => {
    if (!liveFixturesLoaded) {
      dispatch(
        fetchFixturesData(
          fixturesActions.updateLiveFixturesInitially,
          false,
          `live=all`,
          false
        )
      );
      setLiveFixturesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      const fetchingFixturesTimer = setInterval(() => {
        dispatch(
          fetchFixturesData(
            fixturesActions.updateLiveFixtures,
            false,
            `live=all`,
            false
          )
        );
      }, 60 * 1000);
      console.log('reaload');

      return () => {
        clearInterval(fetchingFixturesTimer);
      };
    }
  }, [dispatch]);

  return (
    <>
      {showWindow ? (
        <aside className={classes.liveResultsBar}>
          <div className="flexRowSpace">
            <div className="flexRowCenter">
              <div className={classes.liveDiv}></div>
              <h4>Live Scores:</h4>
            </div>
            <button
              type="button"
              onClick={handleWindowVisibility}
              className={classes.closeLiveScore}
            >
              x
            </button>
          </div>
          {liveFixtures.length > 0 && (
            <div className={classes.liveFixturesWrapper}>
              {liveFixtures.map((fixture) => {
                const checkForChanges = fixture.liveChange
                  ? fixture.liveChange
                  : false;

                const isMatchFinished = fixture.matchIsFinished
                  ? fixture.matchIsFinished
                  : false;

                return (
                  <LiveFixture
                    key={fixture.fixture.id}
                    id={fixture.fixture.id}
                    elapsed={fixture.fixture.status.elapsed}
                    league={fixture.league}
                    teams={fixture.teams}
                    goals={fixture.goals}
                    hasResultChanged={checkForChanges}
                    isMatchFinished={isMatchFinished}
                    status={fixture.fixture.status.short}
                  />
                );
              })}
            </div>
          )}
        </aside>
      ) : (
        <aside className={classes.liveScoreClosed}>
          <button
            type="button"
            onClick={handleWindowVisibility}
            className="flexRow"
          >
            <FontAwesomeIcon size="lg" icon={faCaretDown} />
          </button>
        </aside>
      )}
    </>
  );
};

export default FixedLiveResults;
