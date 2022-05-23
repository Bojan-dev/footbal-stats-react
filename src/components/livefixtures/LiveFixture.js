import { Link } from 'react-router-dom';

import LeagueHeader from '../reusable/LeagueHeader';
import LiveScoreTeam from '../homebody/fixtures/LiveScoreTeam';

import classes from './LiveFixture.module.css';
import globalClasses from '../UI/GlobalClasses.module.css';

import getFixtureStatus from '../../functions/getFixtureStatus';

const LiveFixture = (props) => {
  const checkMatchStatus = getFixtureStatus(props.status, props.elapsed);

  return (
    <>
      <LeagueHeader
        leagueInfo={props.league}
        className={classes.liveFixtureLeague}
        matchStatus={checkMatchStatus}
        islive={!props.isMatchFinished}
      />
      <Link to={`/fixtures/${props.id}`}>
        <div
          className={`${classes.liveScoreFixture} ${
            props.hasResultChanged && globalClasses.resultChanged
          }`}
        >
          {props.hasResultChanged === 1 || props.hasResultChanged === 3 ? (
            <LiveScoreTeam
              isLive={!props.isMatchFinished}
              logo={props.teams.home.logo}
              name={props.teams.home.name}
              goals={props.goals.home}
              className={classes.teamStyles}
              scored={true}
            />
          ) : (
            <LiveScoreTeam
              isLive={!props.isMatchFinished}
              logo={props.teams.home.logo}
              name={props.teams.home.name}
              goals={props.goals.home}
              className={classes.teamStyles}
            />
          )}
          {props.hasResultChanged === 2 || props.hasResultChanged === 3 ? (
            <LiveScoreTeam
              isLive={!props.isMatchFinished}
              logo={props.teams.away.logo}
              name={props.teams.away.name}
              goals={props.goals.away}
              className={classes.teamStyles}
              scored={true}
            />
          ) : (
            <LiveScoreTeam
              isLive={!props.isMatchFinished}
              logo={props.teams.away.logo}
              name={props.teams.away.name}
              goals={props.goals.away}
              className={classes.teamStyles}
            />
          )}
        </div>
      </Link>
    </>
  );
};

export default LiveFixture;
