import { useState } from 'react';

import LiveScoreCardHeader from './LiveScoreCardHeader';
import LiveScoreFiltersFetching from './LiveScoreFiltersFetching';
import LiveScoreLeague from './fixtures/LiveScoreLeague';

import Loading from '../UI/Loading';
import Error from '../UI/Error';

const StatsCard = () => {
  const [dataStatus, setDataStatus] = useState({});

  let output;

  switch (dataStatus.status) {
    case 'loading':
      output = <Loading />;
      break;

    case 'success':
      output = <LiveScoreLeague />;
      break;

    default:
      output = <Error message={dataStatus.message} />;
      break;
  }

  return (
    <>
      <LiveScoreCardHeader></LiveScoreCardHeader>
      <LiveScoreFiltersFetching
        setDataStatus={setDataStatus}
      ></LiveScoreFiltersFetching>
      {output}
    </>
  );
};

export default StatsCard;
