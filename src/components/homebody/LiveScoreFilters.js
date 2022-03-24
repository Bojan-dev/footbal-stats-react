import classes from './LiveScoreFilters.module.css';

import { useDispatch } from 'react-redux';

import { fixturesActions } from '../../store/fixtures-slice';

const LiveScoreFilters = ({ urlParam, setSearchParam }) => {
  const dispatch = useDispatch();

  const paramFilter = urlParam.get('fixtures');

  const onFilterSubmit = (e) => {
    e.preventDefault();
  };

  const handleAllFixtures = () => {
    dispatch(fixturesActions.clearFilteredFixtures());

    setSearchParam({});
  };

  const handleLiveFixtures = (e) => {
    dispatch(fixturesActions.filterLiveFixtures());

    setSearchParam({ fixtures: e.target.value });
  };

  const handleFinishedFixtures = (e) => {
    dispatch(fixturesActions.filterFinishedFixtures());

    setSearchParam({ fixtures: e.target.value });
  };

  return (
    <form
      onSubmit={onFilterSubmit}
      className={`flexRow ${classes.filterCards}`}
    >
      <button
        onClick={handleAllFixtures}
        className={!paramFilter ? classes.active : ''}
      >
        all
      </button>
      <button
        value={'live'}
        onClick={handleLiveFixtures}
        className={paramFilter === 'live' ? classes.active : ''}
      >
        live
      </button>
      <button
        value={'finished'}
        onClick={handleFinishedFixtures}
        className={paramFilter === 'finished' ? classes.active : ''}
      >
        finished
      </button>
    </form>
  );
};

export default LiveScoreFilters;
