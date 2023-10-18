/* eslint-disable no-console */
import QuizActionButton from '@components/atoms/QuizActionButton';
import QuizHeader from '@components/molecules/QuizHeader';
import LoadingSection from '@components/organisms/LoadingBox';
import QuizBox from '@components/organisms/QuizBox';
import { ERRORS } from '@constants/app';
import { QuizAnswer, QuizQuestion } from '@interfaces/apis/student';
import { quizSubmitRequest } from '@services/student';
import { useAuthStore } from '@store/authStore';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTimer } from 'react-timer-hook';

export interface QuizSectionProps {
  quizQuestions: Array<QuizQuestion>;
  quizAnswers: Array<QuizAnswer>;
  setQuizAnswers: Dispatch<SetStateAction<Array<QuizAnswer>>>;
  expiryTimestamp: Date;
}

const QuizSection: FC<QuizSectionProps> = ({
  quizQuestions,
  quizAnswers,
  setQuizAnswers,
  expiryTimestamp,
}) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const submitQuiz = async () => {
    setQuizCompleted(true);
    setLoading(true);
    try {
      const res = await quizSubmitRequest(4, 10, quizAnswers, authToken!);

      if (res.status === 200) {
        setApiError(null);
        console.log(res.data);
        setResult(res.data);
      }
    } catch (error) {
      console.log(error);
      setApiError(ERRORS.SERVER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const { seconds, minutes } = useTimer({
    autoStart: true,
    expiryTimestamp,
    onExpire: () => submitQuiz(),
  });

  const moveQuestion = () => {
    if (currentIndex + 1 === quizQuestions.length) {
      submitQuiz();
    } else {
      setCurrentIndex((currentIndex + 1) % quizQuestions.length);
      setCurrentAnswer('');
      setIsNextDisabled(true);
    }
  };

  const answerQuestion = () => {
    const { questionId } = quizQuestions[currentIndex];
    const answer = parseInt(currentAnswer, 10);
    const answers = quizAnswers.map((a) => {
      if (a.questionId === questionId) {
        return {
          ...a,
          answer,
        };
      }
      return a;
    });

    setQuizAnswers(answers);
    moveQuestion();
  };

  const skipQuestion = () => {
    const { questionId } = quizQuestions[currentIndex];
    setQuizAnswers([
      ...quizAnswers!,
      {
        questionId,
        answer: null,
      },
    ]);
    moveQuestion();
  };

  return (
    <div className="flex flex-col gap-10 p-6 tablet:p-10 tablet:gap-16 desktop:px-64 desktop:py-6 desktop:gap-8">
      {quizCompleted ? (
        <>
          {/* <p>Quiz Completed</p>
          <p>{JSON.stringify(quizAnswers)}</p> */}
          {loading ? (
            <LoadingSection loadingText="Submitting Quiz. Please wait" />
          ) : (
            <div>
              {apiError ? <p>{apiError}</p> : <p>{JSON.stringify(result)}</p>}
            </div>
          )}
        </>
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
  );
};

export default QuizSection;
