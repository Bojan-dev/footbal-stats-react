const possibleMatchStatuses = {
  Process: ['1H', '2H', 'ET'],
  Break: ['BT'],
  HalfTime: ['HT'],
  Penalties: ['P'],
  Finished: ['FT', 'AET', 'PEN', 'AWD', 'WO'],
  Postponed: ['PST'],
  Cancelled: ['SUSP', 'CANC', 'ABD'],
  Interrupted: ['INT'],
  NotStarted: ['TBD', 'NS'],
};

const getFixtureStatus = (fixStatus, elapsedTime) => {
  let fixtureStatus = {
    inProccess: false,
    isPlayingNow: false,
  };

  for (const [key, values] of Object.entries(possibleMatchStatuses)) {
    values.forEach((stat) => {
      if (stat === fixStatus) {
        switch (key) {
          case 'Process':
            fixtureStatus.status = elapsedTime;
            fixtureStatus.inProccess = true;
            fixtureStatus.isPlayingNow = true;
            break;
          case 'Break':
          case 'HalfTime':
          case 'Penalties':
            fixtureStatus.status = stat;
            fixtureStatus.inProccess = true;
            break;
          case 'Finished':
            fixtureStatus.status = stat;
            fixtureStatus.isFinished = true;
            break;
          case 'NotStarted':
            fixtureStatus.status = '';
            break;
          default:
            fixtureStatus.status = key;
        }
      }
    });
  }

  return fixtureStatus;
};

export default getFixtureStatus;

const liveMatchStatuses = ['1H', '2H', 'ET', 'BT', 'HT', 'P'];

export const isMatchLive = (matchStatus) => {
  const isMatchLive = liveMatchStatuses.find(
    (status) => status === matchStatus
  );

  return isMatchLive ? true : false;
};

//prettier-ignore
const finishedCancelledMatchStatuses = ['FT', 'AET', 'PEN', 'AWD', 'WO', 'PST', 'CANC'];

export const isMatchFinished = (matchStatus) => {
  const isMatchPlayed = finishedCancelledMatchStatuses.find(
    (status) => status === matchStatus
  );

  return isMatchPlayed ? true : false;
};

const notStartedStatuses = ['TBD', 'NS'];

export const hasMatchStarted = (matchStatus) => {
  if (notStartedStatuses.find((status) => matchStatus === status)) return false;
  return true;
};
