import { Link } from 'react-router-dom';

import LiveScoreTeam from './LiveScoreTeam';
import classes from './LiveScoreFixture.module.css';
import globalClasses from '../../UI/GlobalClasses.module.css';
import getFixtureStatus from '../../../functions/getFixtureStatus';

import MatchStatus from '../../reusable/MatchStatus';

const LiveScoreFixture = ({ fixture, id }) => {
  const fixtureStatus = fixture.fixture.status.short;

  const checkMatchStatus = getFixtureStatus(
    fixtureStatus,
    fixture.fixture.status.elapsed
  );

  return (
    <Link
      to={`/fixtures/${id}`}
      style={{ textDecoration: 'none', color: 'initial' }}
      key={id}
    >
      <div
        className={`flexRow ${classes.liveScoreFixture} ${
          fixture.liveChange && globalClasses.resultChanged
        }`}
      >
        {checkMatchStatus.inProccess && (
          <div className={classes.liveFixturePointer}></div>
        )}
        <div className={`${classes.timeBox} liveMatchTimeAnimation`}>
          <MatchStatus
            elapsedTime={fixture.fixture.date}
            matchStatus={checkMatchStatus}
          />
        </div>
        <div className={classes.separationLine}></div>
        <div className={`flexColumn ${classes.matchInfoBox}`}>
          {fixture.liveChange === 1 || fixture.liveChange === 3 ? (
            <LiveScoreTeam
              logo={fixture.teams.home.logo}
              name={fixture.teams.home.name}
              goals={fixture.goals.home}
              isLive={checkMatchStatus.inProccess}
              isFinished={checkMatchStatus.isFinished}
              scored={true}
            />
          ) : (
            <LiveScoreTeam
              logo={fixture.teams.home.logo}
              name={fixture.teams.home.name}
              goals={fixture.goals.home}
              isLive={checkMatchStatus.inProccess}
              isFinished={checkMatchStatus.isFinished}
            />
          )}
          {fixture.liveChange === 2 || fixture.liveChange === 3 ? (
            <LiveScoreTeam
              logo={fixture.teams.away.logo}
              name={fixture.teams.away.name}
              goals={fixture.goals.away}
              isLive={checkMatchStatus.inProccess}
              isFinished={checkMatchStatus.isFinished}
              scored={true}
            />
          ) : (
            <LiveScoreTeam
              logo={fixture.teams.away.logo}
              name={fixture.teams.away.name}
              goals={fixture.goals.away}
              isLive={checkMatchStatus.inProccess}
              isFinished={checkMatchStatus.isFinished}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default LiveScoreFixture;
