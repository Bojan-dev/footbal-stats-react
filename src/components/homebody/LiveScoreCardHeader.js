import React, { useState } from 'react';
import classes from './LiveScoreCardHeader.module.css';
import './Calendar.css';

import getSelectedDate from '../../functions/getSelectedDate';
import getFormattedDate from '../../functions/getFormattedDate';
import getCurrentDate from '../../functions/getCurrentDate';

import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { fixturesActions } from '../../store/fixtures-slice';

const LiveScoreCardHeader = () => {
  const fixturesSelectedDate = useSelector(
    (state) => state.fixtures.fixturesDate
  );
  const dispatch = useDispatch();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const isDateToday = getCurrentDate() === fixturesSelectedDate;

  const oneYearForward = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  const oneYearBackwards = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );

  const openCalendarHandler = () => {
    setIsCalendarOpen((prevState) => !prevState);
  };

  const liveScoreHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={liveScoreHandler}
        className={`flexRowStart ${classes.statsCardHeader}`}
      >
        <button
          onClick={() =>
            dispatch(
              fixturesActions.changeFixturesDate({
                date: getSelectedDate(fixturesSelectedDate, true, false),
              })
            )
          }
        >
          &lt;
        </button>
        <button onClick={openCalendarHandler} className={`${classes.active} `}>
          <h4>
            {isDateToday
              ? 'Today'
              : String(new Date(fixturesSelectedDate)).slice(0, 3)}
          </h4>
          <p>{getFormattedDate(fixturesSelectedDate)}</p>
        </button>
        <button
          onClick={() =>
            dispatch(
              fixturesActions.changeFixturesDate({
                date: getSelectedDate(fixturesSelectedDate, true, true),
              })
            )
          }
        >
          &gt;
        </button>
        <button
          onClick={openCalendarHandler}
          className={`flexRow ${
            isCalendarOpen ? classes.isCalendarActive : ''
          }`}
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
          <div className={classes.arrow}></div>
        </button>
        {isCalendarOpen && (
          <Calendar
            onClickDay={(value) => {
              dispatch(
                fixturesActions.changeFixturesDate({
                  date: getSelectedDate(value),
                })
              );
              setIsCalendarOpen(false);
            }}
            minDate={oneYearBackwards}
            maxDate={oneYearForward}
          />
        )}
      </form>
    </>
  );
};

export default React.memo(LiveScoreCardHeader);
