export const getZeroPaddedNumber = (number: number) => {
  const numberStr = number.toString();
  return numberStr.padStart(2, '0');
};

export const minutesToSeconds = (minutes: number) => {
  return minutes * 60;
};

export const secondsToMinutesSeconds = (time: number) => {
  if (time === null || Number.isNaN(time)) {
    return '';
  }
  const minutes = `${Math.floor(time / 60)}`.padStart(2, '0');
  const seconds = `${time - parseInt(minutes, 10) * 60}`.padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const secondsToMinsSecs = (time: number) => {
  if (time === null || Number.isNaN(time)) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return {
    minutes,
    seconds,
  };
};
