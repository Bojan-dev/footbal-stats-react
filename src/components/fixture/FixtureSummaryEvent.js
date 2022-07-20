import { useSelector } from 'react-redux';

import getEventStatus from '../../functions/getEventStatus';

import classes from './SingleFixtureSummary.module.css';

const FixtureSummaryEvent = ({ event, eventByHomeTeam }) => {
  const goalEvents = useSelector((state) => state.fixture.goalEvents);

  const goalScored = goalEvents.find(
    (goal) => goal.goalEvent.time.elapsed === event.time.elapsed
  );

  const eventStatus = getEventStatus(event.type, event.detail, goalScored);

  return (
    <div
      className={`${classes.fixtureEventWrapper} ${classes.paddingEl} statsMargin`}
    >
      <div className={`flexRowCenter`}>
        <p>{event.time.elapsed}'</p>
        <div
          className={
            eventByHomeTeam
              ? `flexRowCenter ${classes.homeEvent}`
              : `flexRowCenter flexRowReverse ${classes.awayEvent}`
          }
        >
          {eventStatus.status === 'Sub' ? (
            eventByHomeTeam ? (
              <p>
                <span className={`italic ${classes.opacityDown}`}>
                  {event.player.name}
                </span>
                &nbsp;/&nbsp;
                {event.assist.name}
              </p>
            ) : (
              <p>
                {event.assist.name}
                &nbsp;/&nbsp;
                <span className={`italic ${classes.opacityDown}`}>
                  {event.player.name}
                </span>
              </p>
            )
          ) : (
            <p>{event.player.name}</p>
          )}
          <div className={classes.eventIconWrapper}>
            <img src={eventStatus.img} alt={eventStatus.alt} />
          </div>
        </div>
        <p className={`textUnderline ${classes.eventStatus}`}>
          {eventStatus.status}
        </p>
      </div>
    </div>
  );
};

export default FixtureSummaryEvent;
