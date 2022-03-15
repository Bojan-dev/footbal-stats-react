import classes from './LeagueHeader.module.css';

const LeagueHeader = ({ leagueInfo, className }) => {
  return (
    <div className={`${classes.leagueHeader} ${className}`}>
      <img
        src={leagueInfo.flag || leagueInfo.logo}
        alt={`${leagueInfo.country} flag`}
      />
      <div className="flexColumn">
        <h3>{leagueInfo.name}</h3>
        <p>{leagueInfo.country}</p>
      </div>
    </div>
  );
};

export default LeagueHeader;
