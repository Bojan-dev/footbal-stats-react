import React, { useEffect } from 'react';

import classes from './LiveScoreFilters.module.css';

import { useSearchParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { fetchFixturesData } from '../../store/fixtures-slice';

import { fixturesActions } from '../../store/fixtures-slice';

const LiveScoreFilters = ({ setDataStatus }) => {
  const [searchParam, setSearchParam] = useSearchParams();

  const fixturesSelectedDate = useSelector(
    (state) => state.fixtures.fixturesDate
  );

  const dispatch = useDispatch();

  const paramFilter = searchParam.get('fixtures');

  useEffect(() => {
    setSearchParam({});
    dispatch(
      fetchFixturesData(
        fixturesActions.updateFixturesInitially,
        fixturesSelectedDate,
        false,
        setDataStatus
      )
    );
  }, [dispatch, fixturesSelectedDate, setSearchParam, setDataStatus]);

  const onFilterSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelectedFilter = (fnc, e) => {
    dispatch(fnc());
    setSearchParam({ fixtures: e.target.value });
  };

  return (
    <form
      onSubmit={onFilterSubmit}
      className={`flexRow ${classes.filterCards}`}
    >
      <button
        value={''}
        onClick={handleSelectedFilter.bind(
          this,
          fixturesActions.clearFilteredFixtures
        )}
        className={!paramFilter ? classes.active : ''}
      >
        all
      </button>
      <button
        value={'live'}
        onClick={handleSelectedFilter.bind(
          this,
          fixturesActions.filterLiveFixtures
        )}
        className={paramFilter === 'live' ? classes.active : ''}
      >
        live
      </button>
      <button
        value={'finished'}
        onClick={handleSelectedFilter.bind(
          this,
          fixturesActions.filterFinishedFixtures
        )}
        className={paramFilter === 'finished' ? classes.active : ''}
      >
        finished
      </button>
    </form>
  );
};

export default LiveScoreFilters;
