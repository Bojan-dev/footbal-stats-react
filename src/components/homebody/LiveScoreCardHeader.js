import React, { useState } from 'react';
import classes from './LiveScoreCardHeader.module.css';
import './Calendar.css';

import getSelectedDate from '../../functions/getSelectedDate';
import getFormattedDate from '../../functions/getFormattedDate';
import getCurrentDate from '../../functions/getCurrentDate';

import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const LiveScoreCardHeader = ({ date, setDate }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const isDateToday = getCurrentDate() === date;

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
        <button onClick={() => setDate(getSelectedDate(date, true, false))}>
          &lt;
        </button>
        <button onClick={openCalendarHandler} className={`${classes.active} `}>
          <h4>{isDateToday ? 'Today' : String(new Date(date)).slice(0, 3)}</h4>
          <p>{getFormattedDate(date)}</p>
        </button>
        <button onClick={() => setDate(getSelectedDate(date, true, true))}>
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
              setDate(getSelectedDate(value));
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

export default LiveScoreCardHeader;
