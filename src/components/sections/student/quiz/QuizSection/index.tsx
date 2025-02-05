import QuizActionButton from '@components/atoms/QuizActionButton';
import QuizHeader from '@components/molecules/QuizHeader';
import Instructions from '@components/organisms/Instructions';
import LoadingSection from '@components/organisms/LoadingBox';
import QuizBox from '@components/organisms/QuizBox';
import ErrorSection from '@components/sections/student/quiz/ErrorSection';
import ResultSection from '@components/sections/student/quiz/ResultSection';

import { ERRORS, MESSAGES } from '@constants/app';
import {
  QuestionResult,
  QuizAnswer,
  QuizQuestion,
  QuizResult,
} from '@interfaces/apis/student';
import { quizSubmitRequest } from '@services/student';
import { useAuthStore } from '@store/authStore';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

export interface QuizSectionProps {
  levelId: number;
  quizId: number;
  quizQuestions: Array<QuizQuestion>;
  quizAnswers: Array<QuizAnswer>;
  setQuizAnswers: Dispatch<SetStateAction<Array<QuizAnswer>>>;
  quizType: 'classwork' | 'homework';
}

const QuizSection: FC<QuizSectionProps> = ({
  levelId,
  quizId,
  quizQuestions,
  quizAnswers,
  quizType,
  setQuizAnswers,
}) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<Array<QuestionResult>>();
  const [quizVerdict, setQuizVerdict] = useState<boolean>();
  const [quizCompletionTime, setQuizCompletionTime] = useState<number>();

  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const getUpdatedAnswers = (ans: string | null) => {
    const { questionId } = quizQuestions[currentIndex];
    const answer = parseInt(ans!, 10);
    const answers = quizAnswers.map((a) => {
      if (a.questionId === questionId) {
        return {
          ...a,
          answer: Number.isNaN(answer) ? null : answer,
        };
      }
      return a;
    });
    return answers;
  };

  const submitQuiz = async (timeTaken: number) => {
    const answers = getUpdatedAnswers(currentAnswer);
    setQuizCompleted(true);
    setLoading(true);
    try {
      const res = await quizSubmitRequest(
        quizId,
        timeTaken,
        answers,
        authToken!
      );

      if (res.status === 200) {
        setApiError(null);
        const resultResponse: QuizResult = res.data;
        setResult(resultResponse.results);
        setQuizVerdict(resultResponse.pass);
        setQuizCompletionTime(resultResponse.time);
      }
    } catch (error) {
      setApiError(ERRORS.SERVER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const { start, pause, totalSeconds, seconds, minutes } = useStopwatch({
    autoStart: false,
  });

  const moveQuestion = () => {
    if (currentIndex + 1 >= quizQuestions.length) {
      pause();
      submitQuiz(totalSeconds);
    } else {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer('');
      setIsNextDisabled(true);
    }
  };

  const answerQuestion = () => {
    const answers = getUpdatedAnswers(currentAnswer);
    setQuizAnswers(answers);
    moveQuestion();
  };

  const skipQuestion = () => {
    const answers = getUpdatedAnswers(null);
    setQuizAnswers(answers);
    moveQuestion();
  };

  useEffect(() => {
    if (quizStarted) {
      start();
    }
  }, [quizStarted, start]);

  return (
    <div className="flex flex-col gap-10 p-6 tablet:p-10 tablet:gap-16 desktop:px-64 desktop:py-6 desktop:gap-8">
      {!quizStarted ? (
        <Instructions startQuiz={setQuizStarted} type="quiz" />
      ) : (
        <div>
          {quizCompleted ? (
            <div>
              {loading ? (
                <LoadingSection loadingText="Submitting Quiz. Please wait" />
              ) : (
                <div>
                  {apiError ? (
                    <ErrorSection
                      errorMessage={apiError}
                      onClick={() => submitQuiz(totalSeconds)}
                      buttonText={MESSAGES.TRY_AGAIN}
                    />
                  ) : (
                    <ResultSection
                      levelId={levelId}
                      result={result!}
                      verdict={quizVerdict!}
                      time={quizCompletionTime!}
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <QuizHeader
                quizType={quizType}
                questionNumber={currentIndex}
                noOfQuestions={quizQuestions.length}
                minutes={minutes}
                seconds={seconds}
              />
              <div className="tablet:px-4">
                <QuizBox
                  quizQuestion={quizQuestions[currentIndex]}
                  answer={currentAnswer}
                  setAnswer={setCurrentAnswer}
                  setDisabled={setIsNextDisabled}
                  submitAnswer={answerQuestion}
                />
              </div>
              <div className="flex items-center justify-center gap-4 pt-4 tablet:gap-12">
                <QuizActionButton
                  type="skip"
                  text="Skip"
                  onClick={skipQuestion}
                  disabled={currentIndex + 1 === quizQuestions.length}
                />
                {currentIndex + 1 === quizQuestions.length ? (
                  <QuizActionButton
                    type="submit"
                    text="Submit"
                    onClick={answerQuestion}
                  />
                ) : (
                  <QuizActionButton
                    type="next"
                    text="Next"
                    disabled={isNextDisabled}
                    onClick={answerQuestion}
                  />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizSection;
