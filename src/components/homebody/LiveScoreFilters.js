import classes from './LiveScoreFilters.module.css';

import { isMatchLive, isMatchFinished } from '../../functions/getFixtureStatus';

const LiveScoreFilters = ({ filterBtnsHandler, urlParam }) => {
  const onFilterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onFilterSubmit}
      className={`flexRow ${classes.filterCards}`}
    >
      <button
        className={!urlParam.get('filter') ? classes.active : ''}
        onClick={filterBtnsHandler.bind(null, undefined, '/', true)}
      >
        all
      </button>
      <button
        className={urlParam.get('filter') === 'live' ? classes.active : ''}
        onClick={filterBtnsHandler.bind(null, isMatchLive, 'live', false)}
      >
        live
      </button>
      <button
        className={urlParam.get('filter') === 'finished' ? classes.active : ''}
        onClick={filterBtnsHandler.bind(
          null,
          isMatchFinished,
          'finished',
          false
        )}
      >
        finished
      </button>
    </form>
  );
};

export default LiveScoreFilters;
