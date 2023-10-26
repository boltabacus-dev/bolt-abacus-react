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
