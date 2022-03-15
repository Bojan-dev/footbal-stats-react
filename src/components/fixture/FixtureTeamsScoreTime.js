import TeamContainer from './TeamContainer';

import classes from './FixtureTeamsScoreTime.module.css';

import getFixtureStatus from '../../functions/getFixtureStatus';

const FixtureTeamsScoreTime = (props) => {
  const score = `${props.score.home ?? ''}-${props.score.away ?? ''}`;

  const dateSplit = props.dateAndTime.replace('T', '-').split('-');

  const dateFormatted = `${dateSplit[2]}.${dateSplit[1]}.${dateSplit[0]}`;

  const matchStatus = getFixtureStatus(props.fixtureStatus, props.matchTime);

  const handleClasses = matchStatus.inProccess ? 'liveFixture' : '';

  return (
    <div className={classes.wrapper}>
      <TeamContainer team={props.teams.home}></TeamContainer>
      <div className="flexColumn">
        <p>{dateFormatted}</p>
        <h1 className={handleClasses}>{`${score}`}</h1>
        {matchStatus.isPlayingNow ? (
          <div
            className={`${handleClasses} ${
              matchStatus.isPlayingNow ? 'liveMatchTimeAnimation' : ''
            }`}
          >
            <p className={handleClasses}>
              {matchStatus.status} <span>'</span>
            </p>
          </div>
        ) : (
          <span></span>
        )}
      </div>
      <TeamContainer team={props.teams.away}></TeamContainer>
    </div>
  );
};

export default FixtureTeamsScoreTime;
