import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.locale('ko');

export const sendTimeManager = () => {
  const today = new Date();
  const hours = today.getHours();
  const realHours = hours >= 10 ? hours : `0${hours}`;
  const minutes = today.getMinutes();
  const realminutes = minutes >= 10 ? minutes : `0${minutes}`;
  const now = `${realHours} : ${realminutes}`;
  return now;
};

export const timeManager = time => {
  const theTime = dayjs(time);
  const now = dayjs();
  if (theTime.isToday() || now.diff(theTime, 'd') < 1) {
    return theTime.format('HH : mm');
  } else {
    return theTime.fromNow();
  }
};
