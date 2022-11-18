import { useSearchParams } from 'react-router-dom';
import classes from '../SingleFixtureClasses.module.css';
import leagueClasses from './SingleFixtureLeagueTable.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

const FILTER_BTNS = ['overall', 'home', 'away'];

const TableFiltersOver = ({ PAGE_BTNS }) => {
  const [searchParam, setSearchParams] = useSearchParams();

  const getParam = searchParam.get('ovr');

  return (
    <>
      <div
        className={`${classes.halfTime}  ${classes.paddingEl} ${leagueClasses.btns} flexRowCenter`}
      >
        {FILTER_BTNS.map((btn) => (
          <button
            key={btn}
            value={btn}
            className={`textCapitalize ${
              getParam === btn || (btn === 'overall' && getParam === null)
                ? leagueClasses.active
                : ''
            }`}
            onClick={() => setSearchParams({ ovr: btn })}
          >
            {btn}
          </button>
        ))}
      </div>
      <div
        className={`${classes.halfTime} ${leagueClasses.tableMargin} ${leagueClasses.grid} ${leagueClasses.tableBtns}`}
      >
        <div className={`flexRowCenter `}>
          <button>
            # <FontAwesomeIcon icon={faCaretUp} size="lg" />
          </button>
          <button className={leagueClasses.rankMargin}>Team</button>
        </div>
        <div>
          {PAGE_BTNS.map((btn) => {
            return (
              <button key={btn} data-type={btn}>
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TableFiltersOver;
