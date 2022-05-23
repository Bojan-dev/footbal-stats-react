import React from 'react';

import classes from './LiveScoreFilters.module.css';

import { useDispatch } from 'react-redux';

import { fixturesActions } from '../../store/fixtures-slice';

const LiveScoreFilters = ({ urlParam, setSearchParam }) => {
  const dispatch = useDispatch();

  const paramFilter = urlParam.get('fixtures');

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
