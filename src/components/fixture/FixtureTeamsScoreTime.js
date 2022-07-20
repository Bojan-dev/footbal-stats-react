import { useSelector } from 'react-redux';

import TeamContainer from './TeamContainer';

import classes from './FixtureTeamsScoreTime.module.css';

import getFixtureStatus from '../../functions/getFixtureStatus';
import CountUpTimer from './CountUpTimer';

import getTime from '../../functions/getTime';

const FixtureTeamsScoreTime = () => {
  const singleFixture = useSelector((state) => state.fixture.selectedFixture);

  const score = `${singleFixture.goals.home ?? ''}-${
    singleFixture.goals.away ?? ''
  }`;

  const dateSplit = singleFixture.fixture.date.replace('T', '-').split('-');

  const dateFormatted = `${dateSplit[2]}.${dateSplit[1]}.${dateSplit[0]}`;

  const matchStatus = getFixtureStatus(
    singleFixture.fixture.status.short,
    singleFixture.fixture.status.elapsed
  );

  const handleClasses = matchStatus.inProccess ? 'liveFixture' : '';

  return (
    <div className={classes.wrapper}>
      <TeamContainer team={singleFixture.teams.home} />
      <div className="flexColumn">
        <p className="textColorMode">
          {dateFormatted} &nbsp; {getTime(singleFixture.fixture.date)}
        </p>
        <h1 className={handleClasses}>{`${score}`}</h1>
        {matchStatus.inProccess || matchStatus.isFinished ? (
          <CountUpTimer
            matchStatus={matchStatus.status}
            elapsedTime={singleFixture.fixture.status.elapsed}
          />
        ) : (
          <span></span>
        )}
      </div>
      <TeamContainer team={singleFixture.teams.away} />
    </div>
  );
};

export default FixtureTeamsScoreTime;
