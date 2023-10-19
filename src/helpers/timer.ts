export const getZeroPaddedNumber = (number: number) => {
  const numberStr = number.toString();
  return numberStr.padStart(2, '0');
};
