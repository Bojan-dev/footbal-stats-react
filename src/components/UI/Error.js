import classes from './Error.module.css';

const Error = ({ message }) => {
  return (
    <div className={classes.errorMessage}>
      <h3>{message}, try again later!</h3>
    </div>
  );
};

export default Error;
