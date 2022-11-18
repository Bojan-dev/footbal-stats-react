import { useState } from 'react';
import hthClasses from './SingleFixtureHeadToHead.module.css';
import formatLeagueName from '../../../functions/formatLeagueName';

const SingleFixtureHeadToHeadLeague = ({ leagueName, leagueFlag }) => {
  const [showLeagueName, setShowLeagueName] = useState(false);

  const handleShowName = () => {
    setShowLeagueName((prevState) => !prevState);
  };

  return (
    <div className={`${hthClasses.league}  flexColumnCenter`}>
      <img src={leagueFlag} alt={leagueName} />
      <p onMouseEnter={handleShowName} onMouseLeave={handleShowName}>
        {formatLeagueName(leagueName)}
      </p>
      {showLeagueName && (
        <p className={`blueBkg ${hthClasses.fullLeagueName}`}>{leagueName}</p>
      )}
    </div>
  );
};

export default SingleFixtureHeadToHeadLeague;
