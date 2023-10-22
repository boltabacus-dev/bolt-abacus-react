export const isValidLevelId = (levelId: string) => {
  const level = parseInt(levelId, 10);

  if (Number.isNaN(level) || level > 10 || level <= 0) {
    return false;
  }
  return true;
};

export const isValidId = (id: string) => {
  const number = parseInt(id, 10);

  if (Number.isNaN(number) || number <= 0) {
    return false;
  }
  return true;
};

export const isValidQuizType = (type: string) => {
  return type === 'classwork' || type === 'homework';
};

export const areValidQuizParams = (
  levelId: string,
  classId: string,
  topicId: string,
  quizType: string
) => {
  if (
    !isValidLevelId(levelId) ||
    !isValidId(classId) ||
    !isValidId(topicId) ||
    !isValidQuizType(quizType)
  )
    return false;
  return true;
};

export const areValidReportsParams = (levelId: string, classId: string) => {
  if (!isValidLevelId(levelId) || !isValidId(classId)) return false;
  return true;
};
