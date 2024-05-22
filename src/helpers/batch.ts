import { LabelValuePair } from '@components/atoms/FormSelect';

export const getDayOptions = () => {
  const options: LabelValuePair[] = [];

  options.push({
    label: 'Monday',
    value: 'Monday',
  });
  options.push({
    label: 'Tuesday',
    value: 'Tuesday',
  });
  options.push({
    label: 'Wednesday',
    value: 'Wednesday',
  });
  options.push({
    label: 'Thursday',
    value: 'Thursday',
  });
  options.push({
    label: 'Friday',
    value: 'Friday',
  });
  options.push({
    label: 'Saturday',
    value: 'Saturday',
  });
  options.push({
    label: 'Sunday',
    value: 'Sunday',
  });

  return options;
};

export const getLevelOptions = () => {
  const options: LabelValuePair[] = [];

  for (let i = 1; i <= 10; i += 1) {
    options.push({
      label: i.toString(),
      value: i,
    });
  }

  return options;
};

export const getClassOptions = () => {
  const options: LabelValuePair[] = [];

  for (let i = 1; i <= 12; i += 1) {
    options.push({
      label: i.toString(),
      value: i,
    });
  }

  return options;
};

const colorsArray = [
  'bg-cardPink',
  'bg-cardRed',
  'bg-cardPurple',
  'bg-cardGreen',
  'bg-cardBlue',
];

export const getBatchCardBgColor = (): string => {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
};

export const getScoreInteger = (n: number) => {
  if (Math.floor(n) === n) return n;
  return n.toFixed(1);
};
