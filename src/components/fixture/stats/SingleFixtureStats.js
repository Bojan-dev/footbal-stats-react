import React from 'react';

import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import classes from './SingleFixtureStats.module.css';

const ORDER_OF_STATS = [9, 2, 0, 1, 7, 12, 6, 8, 10, 13, 14, 15];

const SingleFixtureStats = () => {
  const selectedFixture = useSelector((state) => state.fixture.selectedFixture);

  const homeStats =
    Object.keys(selectedFixture).length > 0 &&
    selectedFixture.statistics.length > 0
      ? selectedFixture.statistics[0].statistics
      : null;
  const awayStats =
    Object.keys(selectedFixture).length > 0 &&
    selectedFixture.statistics.length > 0
      ? selectedFixture.statistics[1].statistics
      : null;

  return (
    Object.keys(selectedFixture).length > 0 &&
    (selectedFixture.statistics.length > 0 ? (
      <div className="fixturePadding">
        {ORDER_OF_STATS.map((statNum) => {
          const homeStatsValue = parseInt(homeStats[statNum].value) || 0;
          const awayStatsValue = parseInt(awayStats[statNum].value) || 0;

          const total = homeStatsValue + awayStatsValue;

          const homeWidth = (homeStatsValue / total) * 50;
          const awayWidth = (awayStatsValue / total) * 50;

          return (
            <div className="statsMargin" key={uuidv4()}>
              {total !== 0 && (
                <>
                  <div className="flexRowSpaceStart">
                    <p>{homeStatsValue}</p>
                    <p className={`textColorMode ${classes.statsH}`}>
                      {homeStats[statNum].type}
                    </p>
                    <p>{awayStatsValue}</p>
                  </div>
                  <div className={`${classes.statsBar} boxBkg`}>
                    <div
                      style={{ width: `${homeWidth}%` }}
                      className="redBkg"
                    ></div>
                    <div
                      style={{ width: `${awayWidth}%` }}
                      className="textBkg"
                    ></div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    ) : (
      <div className="fixturePadding">
        <h4 className="textColorMode">
          No Stats info for the selected fixture!
        </h4>
      </div>
    ))
  );
};

export default SingleFixtureStats;
