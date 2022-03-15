import classes from './TeamContainer.module.css';

const TeamContainer = ({ team }) => {
  return (
    <div className={`${classes.teamContainer} column`}>
      <img src={team.logo} alt="" />
      <h3>{team.name}</h3>
    </div>
  );
};

export default TeamContainer;
