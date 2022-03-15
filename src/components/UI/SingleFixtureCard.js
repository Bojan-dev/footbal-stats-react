import classes from './SingleFixtureCard.module.css';

const SingleFixtureCard = (props) => {
  return (
    <div className={classes.singleFixtureCard}>
      <div>{props.children}</div>
    </div>
  );
};

export default SingleFixtureCard;
