import { v4 as uuidv4 } from 'uuid';

import classes from '../SingleFixtureClasses.module.css';

import formatPlayerName from '../../../functions/formatPlayerName';

const ORDER_OF_POSITIONS = ['G', 'D', 'M', 'F'];

const SingleFixtureFieldLineup = ({ players, formation, isHome }) => {
  const teamFormation = `1-${formation}`.split('-');

  const teamFormationPos = teamFormation.map((lineupRow, i) => {
    if (i === 0) return `${lineupRow}-${ORDER_OF_POSITIONS[0]}-${i + 1}`;
    if (i === 1) return `${lineupRow}-${ORDER_OF_POSITIONS[1]}-${i + 1}`;
    if (i === teamFormation.length - 1)
      return `${lineupRow}-${ORDER_OF_POSITIONS[3]}-${i + 1}`;

    return `${lineupRow}-${ORDER_OF_POSITIONS[2]}-${i + 1}`;
  });

  if (!isHome) teamFormationPos.reverse();

  const bkgColor = isHome ? 'whiteBkg' : 'textBkg';

  return (
    <div
      style={{
        gridTemplateRows: `repeat(${Number(
          players.at(-1).player.grid[0]
        )},1fr)`,
      }}
      className={classes.lineup}
    >
      {teamFormationPos.map((lineupRow) => {
        const playersPerPosition = players.filter(
          (player) => player.player.grid[0] === lineupRow[lineupRow.length - 1]
        );

        const playersPerPositionByOrder = isHome
          ? playersPerPosition
          : playersPerPosition.reverse();

        return (
          <div
            key={uuidv4()}
            className={`grid ${classes.lineupRow}`}
            style={{
              gridTemplateColumns: `repeat(${Number(
                playersPerPositionByOrder.length
              )},1fr)`,
            }}
          >
            {playersPerPositionByOrder.map((player) => (
              <div
                key={uuidv4()}
                className={`${classes.lineupPlayer} flexColumnCenter`}
              >
                <div className={`${classes.playerNumber} ${bkgColor} flexRow `}>
                  <p
                    className={`finishedFixture ${
                      isHome ? 'textColorTxt' : 'textColorWhite'
                    }`}
                  >
                    {player.player.number}
                  </p>
                </div>
                <p className="finishedFixture textColorWhite">
                  {formatPlayerName(player.player.name)}
                </p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default SingleFixtureFieldLineup;
