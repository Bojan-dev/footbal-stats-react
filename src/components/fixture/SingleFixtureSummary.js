import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { singleFixtureActions } from '../../store/singlefixture-slice';

import { v4 as uuidv4 } from 'uuid';

import FixtureSummaryEvent from './FixtureSummaryEvent';

import classes from './SingleFixtureSummary.module.css';

const SingleFixtureSummary = () => {
  const dispatch = useDispatch();
  const selectedFixture = useSelector((state) => state.fixture.selectedFixture);

  //prettier-ignore
  const secondHalfTimeScore = `${selectedFixture.goals.home - selectedFixture.score.halftime.home}-${selectedFixture.goals.away - selectedFixture.score.halftime.away}`;

  useEffect(() => {
    selectedFixture.events.forEach((event) => {
      if (event.type === 'Goal' && event.detail !== 'Missed Penalty') {
        dispatch(singleFixtureActions.updateEvent(event));
      }
    });
  }, [dispatch, selectedFixture.events]);

  return (
    <div className={`fixturePadding flexColumnCenter`}>
      <div
        className={`${classes.halfTime} flexRowSpace ${classes.paddingEl} statsMargin`}
      >
        <p>1st. Half</p>
        <p className="textUnderline">{`${selectedFixture.score.halftime.home}-${selectedFixture.score.halftime.away}`}</p>
      </div>
      {selectedFixture.events
        .filter((event) => event.time.elapsed <= 45)
        .map((event) => {
          const eventByTeam =
            event.team.id === selectedFixture.teams.home.id ? true : false;
          return (
            <FixtureSummaryEvent
              key={uuidv4()}
              event={event}
              eventByHomeTeam={eventByTeam}
            />
          );
        })}
      {selectedFixture.fixture.status.elapsed > 45 && (
        <>
          <div
            className={`${classes.halfTime} flexRowSpace ${classes.paddingEl} statsMargin`}
          >
            <p>2nd. Half</p>
            <p className="textUnderline">{secondHalfTimeScore}</p>
          </div>
          {selectedFixture.events
            .filter((event) => event.time.elapsed > 45)
            .map((event) => {
              const eventByTeam =
                event.team.id === selectedFixture.teams.home.id ? true : false;
              return (
                <FixtureSummaryEvent
                  key={uuidv4()}
                  event={event}
                  eventByHomeTeam={eventByTeam}
                />
              );
            })}
        </>
      )}
    </div>
  );
};

export default SingleFixtureSummary;
