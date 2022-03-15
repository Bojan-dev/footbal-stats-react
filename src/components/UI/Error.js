import classes from './Error.module.css';

const Error = (props) => {
  return (
    <div className={classes.errorMessage}>
      <h3>{props.message}, try again later!</h3>
    </div>
  );
};

export default Error;
