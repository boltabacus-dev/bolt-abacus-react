export const isValidLevelId = (levelId: string) => {
  const level = parseInt(levelId, 10);

  if (Number.isNaN(level) || level > 10 || level <= 0) {
    return false;
  }
  return true;
};
