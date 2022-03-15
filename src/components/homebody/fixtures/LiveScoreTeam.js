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
    handleGoals = props.goals ?? '-';
  }

  return (
    <div className={`flexRow ${classes.teamInfo}`}>
      <div>
        <img src={props.logo} alt={`${props.name} logo`} />
        <p>{props.name}</p>
      </div>
      {handleGoals}
    </div>
  );
};

export default LiveScoreTeam;
