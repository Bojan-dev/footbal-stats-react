import classes from './LeagueHeader.module.css';
import MatchStatus from './MatchStatus';

import missingFlag from '../../images/missingflag.png';

const LeagueHeader = ({ leagueInfo, className, matchStatus, islive }) => {
  return (
    <div className={`${classes.leagueHeader} ${className}`}>
      <img
        src={leagueInfo.flag || leagueInfo.logo || missingFlag}
        alt={`${leagueInfo.country} flag`}
      />
      <div className="flexColumn">
        <h3>{leagueInfo.name}</h3>
        <p>{leagueInfo.country}</p>
      </div>
      {matchStatus && (
        <div className={`liveMatchTimeAnimation ${classes.headerElapsedTime}`}>
          {islive ? (
            <MatchStatus
              elapsedTime={matchStatus.elapsedTime}
              matchStatus={matchStatus}
            />
          ) : (
            <p className="finishedFixture">FT</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LeagueHeader;
