import normalGoal from '../images/goal_icon.svg';
import autoGoal from '../images/agoal_icon.svg';
import penaltyMissed from '../images/mpenalty_icon.svg';
import yellowCard from '../images/ycard_icon.svg';
import secondYellowCard from '../images/rycard_icon.svg';
import redCard from '../images/rcard_icon.svg';
import substitution from '../images/sub_icon.svg';
import varIcon from '../images/var_icon.svg';

const getEventStatus = (eventType, eventDetail, goalScored = false) => {
  let eventStatus = {
    img: '',
    status: '',
    alt: '',
    goalScored: false,
  };
  if (eventType === 'Goal') {
    switch (eventDetail) {
      case 'Normal Goal':
        eventStatus.img = normalGoal;
        eventStatus.status = `${goalScored.homeGoals}-${goalScored.awayGoals}`;
        eventStatus.alt = 'Goal Scored';
        eventStatus.goalScored = true;
        break;
      case 'Own Goal':
        eventStatus.img = autoGoal;
        eventStatus.status = `${goalScored.homeGoals}-${goalScored.awayGoals}`;
        eventStatus.alt = 'Own Goal Scored';
        eventStatus.goalScored = true;
        break;
      case 'Penalty':
        eventStatus.img = normalGoal;
        eventStatus.status = `${goalScored.homeGoals}-${goalScored.awayGoals}`;
        eventStatus.alt = 'Penalty Goal Scored';
        eventStatus.goalScored = true;
        break;
      default:
        eventStatus.img = penaltyMissed;
        eventStatus.status = 'Penalty Missed';
        eventStatus.alt = 'Penalty Missed';
        break;
    }
  }
  if (eventType === 'Card') {
    switch (eventDetail) {
      case 'Yellow Card':
        eventStatus.img = yellowCard;
        eventStatus.status = 'Yellow Card';
        break;
      case 'Second Yellow card':
        eventStatus.img = secondYellowCard;
        eventStatus.status = 'Red Card';
        eventStatus.alt = 'Second Yellow Card/Red';
        break;
      default:
        eventStatus.img = redCard;
        eventStatus.status = 'Red Card';
        eventStatus.alt = 'Red Card';
        break;
    }
  }
  if (eventType === 'subst') {
    eventStatus.img = substitution;
    eventStatus.status = 'Sub';
    eventStatus.alt = 'Substitution';
  }
  if (eventType === 'Var') {
    if (eventDetail === 'Goal cancelled') {
      eventStatus.img = varIcon;
      eventStatus.status = 'Goal Cancelled';
      eventStatus.alt = 'Goal Cancelled';
    }
    if (eventDetail === 'Penalty confirmed') {
      eventStatus.img = varIcon;
      eventStatus.status = 'Penalty confirmed';
      eventStatus.alt = 'Penalty confirmed';
    }
  }

  return eventStatus;
};

export default getEventStatus;
