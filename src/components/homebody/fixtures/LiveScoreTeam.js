import classes from './LiveScoreTeam.module.css';

const LiveScoreTeam = (props) => {
  let handleGoals;

  if (props.isLive) {
    handleGoals = (
      <p className="liveFixture">
        <span>{props.goals}</span>
      </p>
    );
  } else if (props.isFinished) {
    handleGoals = <p className="finishedFixture">{props.goals}</p>;
  } else {
    handleGoals = props.goals !== null ? <p>{props.goals}</p> : '-';
  }

  return (
    <div
      className={`flexRow ${classes.teamInfo} ${
        props.className ? props.className : ''
      }`}
    >
      <div>
        <img src={props.logo} alt={`${props.name} logo`} />
        <p>
          {props.name.length > 13 ? `${props.name.slice(0, 13)}.` : props.name}
        </p>
        {props.scored ? (
          <p className={`${classes.goalScored} liveFixture`}>
            <span>⚽</span>
          </p>
        ) : (
          ''
        )}
      </div>
      {handleGoals}
    </div>
  );
};

export default LiveScoreTeam;
