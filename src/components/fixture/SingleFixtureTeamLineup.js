import formatPlayerName from '../../functions/formatPlayerName';

import classes from './SingleFixtureSummary.module.css';

const SingleFixtureTeamLineup = ({ lineup, subs, coach, isHome }) => {
  return (
    <div className={`flexColumn ${classes.lineupWrapper}`}>
      <div className="width--max">
        <div
          className={`${classes.lineupDiv} greenBkg finishedFixture ${classes.marginBottom} textColorWhite`}
        >
          First-Team
        </div>
        <div className={`${classes.lineupDiv} finishedFixture greenBkg`}>
          {lineup.map(({ player }) => (
            <div
              key={player.id}
              className={`flexRowCenter ${classes.marginBottom}`}
            >
              <div
                className={`${classes.playerNumber} ${
                  isHome ? 'whiteBkg' : 'textBkg'
                } flexRow `}
              >
                <p
                  className={`finishedFixture ${
                    isHome ? 'textColorTxt' : 'textColorWhite'
                  }`}
                >
                  {player.number}
                </p>
              </div>
              <p className={`${classes.playerName} textColorWhite`}>
                {formatPlayerName(player.name)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="width--max ">
        <div
          className={`${classes.lineupDiv} textBkg finishedFixture ${classes.marginBottom}`}
        >
          <p className="textColorModeWhite finishedFixture">Substitutions</p>
        </div>
        <div className={`${classes.lineupDiv} finishedFixture `}>
          {subs.map(({ player }) => (
            <div
              key={player.id}
              className={`flexRowCenter ${classes.marginBottom}`}
            >
              <div
                className={`${classes.playerNumber}  flexRow ${classes.sub}`}
              >
                <p className="finishedFixture">{player.number}</p>
              </div>
              <p className={`${classes.playerName} textColorMode `}>
                {formatPlayerName(player.name)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="width--max ">
        <div
          className={`${classes.lineupDiv} textBkg  ${classes.marginBottom}`}
        >
          <p className="textColorModeWhite finishedFixture">Coach</p>
        </div>
        <div className={`${classes.lineupDiv} finishedFixture `}>
          <p className="textColorMode">{formatPlayerName(coach.name)}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleFixtureTeamLineup;
