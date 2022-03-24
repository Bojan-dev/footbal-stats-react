import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchFixturesData } from '../../store/fixtures-slice';

import { getCurrentDate } from '../../functions/getCurrentDate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import classes from './FixedLiveResults.module.css';

const FixedLiveResults = () => {
  const dispatch = useDispatch();
  const [showWindow, setShowWindow] = useState(true);

  const handleWindowVisibility = () => {
    setShowWindow((prevState) => !prevState);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(fetchFixturesData());
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
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
