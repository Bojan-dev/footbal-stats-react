import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import classes from '../SingleFixtureClasses.module.css';
import leagueClasses from './SingleFixtureLeagueTable.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import handlePromotionColor from '../../../functions/controlPromotionColor';

const FILTER_BTNS = ['overall', 'home', 'away'];

const TABLE_COLUMNS = ['P', 'W', 'D', 'L', 'G', 'GD', 'PTS'];

const SingleFixtureLeagueTableInfo = ({ page }) => {
  const leagueTable = useSelector((state) => state.fixture.leagueTable);
  const [searchParam, setSearchParams] = useSearchParams();

  console.log(leagueTable);

  useEffect(() => {}, []);

  const getParam = searchParam.get('ovr');

  return (
    <>
      {leagueTable.standings[0].map((team) => {
        const promotionClasses = handlePromotionColor(team.description);

        console.log(team);

        return (
          <div
            key={team.team.id}
            className={`${leagueClasses.grid} ${leagueClasses.row} ${leagueClasses.tableBtns}`}
          >
            <div>
              {team.description && (
                <div className={leagueClasses.promotion}></div>
              )}
              <p>{`${team.rank}.`}</p>
              <div className="flexRowCenter">
                <img
                  className={leagueClasses.teamLogo}
                  src={team.team.logo}
                  alt={`${team.team.name} logo`}
                />
                <p>{team.team.name}</p>
              </div>
            </div>
            <div>
              <p>{team.all.played}</p>
              <p>{team.all.win}</p>
              <p>{team.all.draw}</p>
              <p>{team.all.lose}</p>
              <p>{`${team.all.goals.for}:${team.all.goals.against}`}</p>
              <p>{team.goalsDiff}</p>
              <p>{team.points}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SingleFixtureLeagueTableInfo;
