import { FC, useEffect, useState } from 'react';

import QuizActionButton from '@components/atoms/QuizActionButton';
import PracticeHeader from '@components/molecules/PracticeHeader';
import SetPracticeForm from '@components/organisms/SetPracticeForm';
import QuizBox from '@components/organisms/QuizBox';
import LoadingSection from '@components/organisms/LoadingBox';
import ResultSection from '@components/sections/student/practice/ResultSection';
import ErrorSection from '@components/sections/student/quiz/ErrorSection';

import {
  QuestionResult,
  QuizAnswer,
  QuizQuestion,
} from '@interfaces/apis/student';
import {
  generatePracticeAnswers,
  generatePracticeQuestions,
  generateResult,
} from '@helpers/questionBuilder';
import { practiceSubmitRequest } from '@services/student';

import { useAuthStore } from '@store/authStore';
import { MESSAGES } from '@constants/app';
import { secondsToMinsSecs } from '@helpers/timer';

export interface SetPracticeSectionProps {
  operation: 'addition' | 'multiplication' | 'division';
}

const SetPracticeSection: FC<SetPracticeSectionProps> = ({ operation }) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(false);
  const [apiError] = useState<string | null>(null);

  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const [quizQuestions, setQuizQuestions] = useState<Array<QuizQuestion>>([]);
  const [quizAnswers, setQuizAnswers] = useState<Array<QuizAnswer>>([]);

  const [quizResult, setQuestionResult] = useState<Array<QuestionResult>>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [averageTime, setAverageTime] = useState(0);

  const [timeLimit, setTimeLimit] = useState(1);
  const [totalSeconds, setTotalSeconds] = useState(timeLimit * 60);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [numberOfDigits, setNumberOfDigits] = useState(1);
  const [isZigzag, setIsZigzag] = useState(false);
  const [numberOfRows, setNumberOfRows] = useState(2);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(true);

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

  const submitQuiz = async (timeRemaining: number) => {
    const answers = getUpdatedAnswers(currentAnswer);
    setLoading(true);
    setIsQuizCompleted(true);

    const { result, totalScore: score } = generateResult(
      quizQuestions,
      answers
    );

    const avg = (timeLimit * 60 - timeRemaining) / answers.length;

    setTotalTimeTaken(timeLimit * 60 - timeRemaining);
    setAverageTime(parseFloat(avg.toFixed(2)));
    setTotalScore(score);
    setQuestionResult(result);

    try {
      await practiceSubmitRequest(
        'timed',
        numberOfQuestions,
        operation,
        numberOfDigits,
        score,
        timeLimit,
        parseFloat(avg.toFixed(2)),
        authToken!
      );
    } catch (error) {
      // setApiError(ERRORS.SERVER_ERROR);
    }
    setLoading(false);
  };

  useEffect(() => {
    setTotalSeconds(timeLimit * 60);
  }, [timeLimit]);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isTimerRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    } else if (totalSeconds === 0) {
      submitQuiz(0);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning, totalSeconds]);

  const handleStartQuiz = () => {
    setQuizQuestions(
      generatePracticeQuestions(
        operation,
        numberOfDigits,
        numberOfQuestions,
        numberOfRows,
        isZigzag
      )
    );
    setQuizAnswers(generatePracticeAnswers(numberOfQuestions));
    setIsTimerRunning(true);
    setIsQuizStarted(true);
  };

  const moveQuestion = () => {
    if (currentIndex + 1 >= quizQuestions.length) {
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

  return (
    <div className="tablet:gap-16 tablet:p-10 desktop:px-64 desktop:py-6 flex flex-col gap-10 desktop:gap-8 p-6">
      {!isQuizStarted ? (
        <SetPracticeForm
          operation={operation}
          numberOfQuestions={numberOfQuestions}
          setNumberOfQuestions={setNumberOfQuestions}
          timeLimit={timeLimit}
          setTimeLimit={setTimeLimit}
          numberOfDigits={numberOfDigits}
          setNumberOfDigits={setNumberOfDigits}
          isZigzag={isZigzag}
          setIsZigzag={setIsZigzag}
          numberOfRows={numberOfRows}
          setNumberOfRows={setNumberOfRows}
          handleStartQuiz={handleStartQuiz}
        />
      ) : (
        <div>
          {isQuizCompleted ? (
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
                      result={quizResult!}
                      time={totalTimeTaken!}
                      totalScore={`${totalScore} of ${quizAnswers.length}`}
                      averageTime={averageTime}
                      practiceType="set"
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <PracticeHeader
                practiceType="set"
                questionNumber={currentIndex}
                noOfQuestions={quizQuestions.length}
                minutes={secondsToMinsSecs(totalSeconds).minutes}
                seconds={secondsToMinsSecs(totalSeconds).seconds}
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
              <div className="tablet:gap-12 flex justify-center items-center gap-4 pt-4">
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

export default SetPracticeSection;
