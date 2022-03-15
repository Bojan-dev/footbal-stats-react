import classes from './PageCard.module.css';

const PageCard = (props) => {
  return (
    <main className={`marginTop ${classes.PageCard}`}>{props.children}</main>
  );
};

export default PageCard;
