import LeagueHeader from '../reusable/LeagueHeader';
import FixtureTeamsScoreTime from './FixtureTeamsScoreTime';

import classes from './FixtureInfo.module.css';

const SingleFixtureInfo = (props) => {
  return (
    <>
      <LeagueHeader
        leagueInfo={props.league}
        className={classes.leagueHeader}
      />
      <div className={classes.separationLine}></div>
      <FixtureTeamsScoreTime
        dateAndTime={props.dateAndTime}
        matchTime={props.matchTime}
        score={props.score}
        teams={props.teams}
        fixtureStatus={props.fixtureStatus}
      ></FixtureTeamsScoreTime>
    </>
  );
};

export default SingleFixtureInfo;
