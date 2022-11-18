import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { singleFixtureActions } from '../../../store/singlefixture-slice';
import leagueClasses from './SingleFixtureLeagueTable.module.css';
import classes from '../SingleFixtureClasses.module.css';
import handlePromotionColor from '../../../functions/controlPromotionColor';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

const FILTER_BTNS = ['overall', 'home', 'away'];

const LeagueTableForm = ({ page, columns }) => {
  const [searchParam, setSearchParams] = useSearchParams();
  const leagueTable = useSelector((state) => state.fixture.leagueTable);
  const dispatch = useDispatch();
  const getParam = searchParam.get('ovr');

  const reverseTeams = () => {
    dispatch(singleFixtureActions.reverseLeagueTable());
  };

  return (
    <>
      {page === 'table' && (
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
      )}
      <div
        className={`${classes.halfTime} ${leagueClasses.tableMargin} ${leagueClasses.grid} ${leagueClasses.tableBtns}`}
      >
        <div className={`flexRowCenter `}>
          <button onClick={reverseTeams}>
            # <FontAwesomeIcon icon={faCaretUp} size="lg" />
          </button>
          <button
            className={`
             ${leagueClasses.logoGap}`}
          >
            Team
          </button>
        </div>
        <div>
          {columns.map((btn) => {
            return (
              <button key={btn} data-type={btn}>
                {btn}
              </button>
            );
          })}
        </div>
      </div>
      {leagueTable.standings[0].map((team) => {
        const promotionClasses = handlePromotionColor(team.description);

        let selectedFilter = team.all;

        if (getParam === FILTER_BTNS[1]) selectedFilter = team[FILTER_BTNS[1]];
        if (getParam === FILTER_BTNS[2]) selectedFilter = team[FILTER_BTNS[2]];

        return (
          <div
            key={team.team.id}
            className={`${leagueClasses.grid} ${leagueClasses.row} ${leagueClasses.tableBtns}`}
          >
            <div className="flexRowCenter">
              {team.description && (
                <div
                  className={`${leagueClasses.promotion} ${promotionClasses}`}
                ></div>
              )}
              <p className={leagueClasses.rankMargin}>{`${team.rank}.`}</p>
              <div className={`flexRowCenter ${leagueClasses.logoGap}`}>
                <img
                  className={leagueClasses.teamLogo}
                  src={team.team.logo}
                  alt={`${team.team.name} logo`}
                />
                <p>{team.team.name}</p>
              </div>
            </div>
            <div>
              <p>{selectedFilter.played}</p>
              <p>{selectedFilter.win}</p>
              <p>{selectedFilter.draw}</p>
              <p>{selectedFilter.lose}</p>
              <p>{`${selectedFilter.goals.for}:${selectedFilter.goals.against}`}</p>
              {/* <p>{team.goalsDiff}</p>
              <p className="finishedFixture">{team.points}</p> */}
              {page === 'table' ? (
                <>
                  <p>
                    {selectedFilter.goals.for - selectedFilter.goals.against}
                  </p>
                  <p className="finishedFixture">
                    {selectedFilter.win * 3 +
                      selectedFilter.draw * 1 +
                      selectedFilter.lose * 0}
                  </p>
                </>
              ) : (
                <>
                  <p className="finishedFixture">
                    {selectedFilter.win * 3 +
                      selectedFilter.draw * 1 +
                      selectedFilter.lose * 0}
                  </p>
                  <p>
                    {team.form.split('').map((game) => {
                      const gameBkgClr =
                        game === 'W'
                          ? 'greenBkg'
                          : game === 'L'
                          ? 'redBkg'
                          : 'drawBkg';

                      return (
                        <i
                          key={uuid()}
                          className={`${gameBkgClr} textColorWhite ${leagueClasses.form}`}
                        >
                          {game}
                        </i>
                      );
                    })}
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LeagueTableForm;
