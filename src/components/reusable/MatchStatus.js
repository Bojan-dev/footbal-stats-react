import getTime from '../../functions/getTime';

const MatchStatus = ({ elapsedTime, matchStatus }) => {
  const fixtureTime = getTime(elapsedTime);

  let fixtureStatusContext;

  //prettier-ignore
  if(matchStatus.inProccess && matchStatus.isPlayingNow) fixtureStatusContext =  <p className="liveFixture">{matchStatus.status}<span>'</span></p>
  //prettier-ignore
  if(matchStatus.inProccess && !matchStatus.isPlayingNow)fixtureStatusContext = <p className="liveFixture">{matchStatus.status}</p>;
  //prettier-ignore
  if(!matchStatus.inProccess && !matchStatus.isPlayingNow) fixtureStatusContext = <p>{fixtureTime}</p>;
  //prettier-ignore
  if(!matchStatus.inProccess && !matchStatus.isPlayingNow && matchStatus.status) fixtureStatusContext =  <p className='finishedFixture'>{matchStatus.status}</p>;

  return <>{fixtureStatusContext}</>;
};

export default MatchStatus;
