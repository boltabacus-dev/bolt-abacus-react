export type QuizPageParams = {
  levelId: string;
  classId: string;
  topicId: string;
  quizType: string;
};

export type TestPageParams = {
  levelId: string;
  classId: string;
};

export type LevelPageParams = {
  levelId: string;
};

export type ReportPageParams = {
  levelId: string;
  classId: string;
};

export type EditQuestionPageParams = {
  questionId: string;
};

export type EditBatchPageParams = {
  batchId: string;
};

export type EditOrganizationPageParams = {
  tagName: string;
};

export type UpdateBatchLinkPageParams = {
  batchId: string;
};

export type BatchReportPageParams = {
  batchId: string;
};

export type StudentProgressPageParams = {
  studentId: string;
};

export type ResetPasswordPageParams = {
  authToken: string;
};
