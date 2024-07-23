import { FULL_MARKS, PASS_MARKS } from '@constants/app';

export const getClassNamesForScore = (time: number, score: number): string => {
  if (time === 0 && score === 0) {
    return 'border-grey bg-grey/10 text-white';
  }
  if (time > 0 && score === FULL_MARKS) {
    return 'border-green bg-green/10 text-green';
  }
  if (time > 0 && score < FULL_MARKS && score >= PASS_MARKS) {
    return 'border-orange bg-orange/10 text-orange';
  }

  return 'border-red bg-red/10 text-red';
};

export const getButtonTypeForScore = (
  time: number,
  score: number
): 'grey' | 'green' | 'yellow' | 'red' => {
  if (time === 0 && score === 0) {
    return 'grey';
  }
  if (time > 0 && score === FULL_MARKS) {
    return 'green';
  }
  if (time > 0 && score < FULL_MARKS && score >= PASS_MARKS) {
    return 'yellow';
  }

  return 'red';
};
