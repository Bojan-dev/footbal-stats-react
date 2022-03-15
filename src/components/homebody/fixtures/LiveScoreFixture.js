import { Link } from 'react-router-dom';

import LiveScoreTeam from './LiveScoreTeam';
import classes from './LiveScoreFixture.module.css';
import getTime from '../../../functions/getTime';
import getFixtureStatus from '../../../functions/getFixtureStatus';

const LiveScoreFixture = (props) => {
  const { fixture, id } = props;

  const fixtureStatus = fixture.fixture.status.short;

  const fixtureTime = getTime(fixture.fixture.date);

  const checkMatchStatus = getFixtureStatus(
    fixtureStatus,
    fixture.fixture.status.elapsed
  );

  let fixtureStatusContext;

  //prettier-ignore
  if(checkMatchStatus.inProccess && checkMatchStatus.isPlayingNow) fixtureStatusContext =  <p className="liveFixture">{checkMatchStatus.status}<span>'</span></p>
  //prettier-ignore
  if(checkMatchStatus.inProccess && !checkMatchStatus.isPlayingNow)fixtureStatusContext = <p  className="liveFixture">{checkMatchStatus.status}</p>;
  //prettier-ignore
  if(!checkMatchStatus.inProccess && !checkMatchStatus.isPlayingNow) fixtureStatusContext = <p>{fixtureTime}</p>;
  //prettier-ignore
  if(!checkMatchStatus.inProccess && !checkMatchStatus.isPlayingNow && checkMatchStatus.status) fixtureStatusContext =  <p className='finishedFixture'>{checkMatchStatus.status}</p>

  return (
    <Link
      to={`/fixtures/${id}`}
      style={{ textDecoration: 'none', color: 'initial' }}
      key={id}
    >
      <div className={`flexRow ${classes.liveScoreFixture}`}>
        {checkMatchStatus.inProccess && (
          <div className={classes.liveFixturePointer}></div>
        )}
        <div className={`${classes.timeBox} liveMatchTimeAnimation`}>
          {fixtureStatusContext}
        </div>
        <div className={classes.separationLine}></div>
        <div className={`flexColumn ${classes.matchInfoBox}`}>
          <LiveScoreTeam
            logo={fixture.teams.home.logo}
            name={fixture.teams.home.name}
            goals={fixture.goals.home}
            isLive={checkMatchStatus.inProccess}
            isFinished={checkMatchStatus.isFinished}
          />
          <LiveScoreTeam
            logo={fixture.teams.away.logo}
            name={fixture.teams.away.name}
            goals={fixture.goals.away}
            isLive={checkMatchStatus.inProccess}
            isFinished={checkMatchStatus.isFinished}
          />
        </div>
      </div>
    </Link>
  );
};

export default LiveScoreFixture;
