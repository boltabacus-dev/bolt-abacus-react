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
import { useTimer } from 'react-timer-hook';

export interface QuizSectionProps {
  quizId: number;
  quizQuestions: Array<QuizQuestion>;
  quizAnswers: Array<QuizAnswer>;
  setQuizAnswers: Dispatch<SetStateAction<Array<QuizAnswer>>>;
  totalSeconds: number;
  expiryTimestamp: Date;
}

const QuizSection: FC<QuizSectionProps> = ({
  quizId,
  quizQuestions,
  quizAnswers,
  setQuizAnswers,
  totalSeconds,
  expiryTimestamp,
}) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<Array<QuestionResult>>();
  const [quizVerdict, setQuizVerdict] = useState<boolean>();

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

  const submitQuiz = async (remainingSeconds: number) => {
    const answers = getUpdatedAnswers(currentAnswer);
    setQuizCompleted(true);
    setLoading(true);
    const timeTaken = totalSeconds - remainingSeconds;
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
      }
    } catch (error) {
      setApiError(ERRORS.SERVER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const {
    start,
    pause,
    totalSeconds: remainingSeconds,
    seconds,
    minutes,
  } = useTimer({
    autoStart: false,
    expiryTimestamp,
    onExpire: () => submitQuiz(0),
  });

  const moveQuestion = () => {
    if (currentIndex + 1 === quizQuestions.length) {
      pause();
      submitQuiz(remainingSeconds);
    } else {
      setCurrentIndex((currentIndex + 1) % quizQuestions.length);
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
        <Instructions startQuiz={setQuizStarted} />
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
                      onClick={() => submitQuiz(remainingSeconds)}
                      buttonText={MESSAGES.TRY_AGAIN}
                    />
                  ) : (
                    <ResultSection result={result!} verdict={quizVerdict!} />
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <QuizHeader
                quizType="classwork"
                quizProgress={((currentIndex + 1) / quizQuestions.length) * 100}
                minutes={minutes}
                seconds={seconds}
              />
              <div className="tablet:px-4">
                <QuizBox
                  quizQuestion={quizQuestions[currentIndex]}
                  answer={currentAnswer}
                  setAnswer={setCurrentAnswer}
                  setDisabled={setIsNextDisabled}
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
