import classes from './FixedLiveResults.module.css';

const FixedLiveResults = () => {
  return (
    <aside className={classes.liveResultsBar}>
      <div className="flexRowSpace">
        <h4>Live Results:</h4>
        <div className={classes.liveDiv}></div>
      </div>
    </aside>
  );
};

export default FixedLiveResults;
