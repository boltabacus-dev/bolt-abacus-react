import { FC, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

import QuizActionButton from '@components/atoms/QuizActionButton';
import PracticeHeader from '@components/molecules/PracticeHeader';
import FlashCardsForm from '@components/organisms/FlashCardsForm';

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
import { ERRORS, MESSAGES } from '@constants/app';
import FlashCardBox from '@components/organisms/FlashCardBox';

export interface FlashCardsSectionProps {
  operation: 'addition' | 'multiplication' | 'division';
}

const FlashCardsSection: FC<FlashCardsSectionProps> = ({ operation }) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const [quizQuestions, setQuizQuestions] = useState<Array<QuizQuestion>>([]);
  const [quizAnswers, setQuizAnswers] = useState<Array<QuizAnswer>>([]);

  const [quizResult, setQuestionResult] = useState<Array<QuestionResult>>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [averageTime, setAverageTime] = useState(0);

  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [numberOfDigits, setNumberOfDigits] = useState(1);
  const [numberOfRows, setNumberOfRows] = useState(2);
  const [isZigzag, setIsZigzag] = useState(false);
  const [includeSubtraction, setIncludeSubtraction] = useState(false);
  const [persistNumberOfDigits, setPersistNumberOfDigits] = useState(false);
  const [speed, setSpeed] = useState<number>(2500);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const { start, pause, totalSeconds, seconds, minutes } = useStopwatch({
    autoStart: false,
  });

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
    setLoading(true);
    setIsQuizCompleted(true);

    const { result, totalScore: score } = generateResult(
      quizQuestions,
      answers
    );
    const avg = timeTaken / quizQuestions.length;

    setAverageTime(parseFloat(avg.toFixed(2)));
    setTotalScore(score);
    setQuestionResult(result);

    try {
      await practiceSubmitRequest(
        'flashcards',
        operation,
        numberOfDigits,
        numberOfQuestions,
        numberOfRows,
        isZigzag,
        includeSubtraction,
        persistNumberOfDigits,
        score,
        totalSeconds,
        parseFloat(avg.toFixed(2)),
        authToken!
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setApiError(ERRORS.SERVER_ERROR);
    }
    setLoading(false);
  };

  const handleStartQuiz = () => {
    setLoading(true);
    setQuizQuestions(
      generatePracticeQuestions(
        operation,
        numberOfDigits,
        numberOfDigits,
        numberOfQuestions,
        numberOfRows,
        isZigzag,
        includeSubtraction,
        persistNumberOfDigits,
        false
      )
    );
    setLoading(false);
    setQuizAnswers(generatePracticeAnswers(numberOfQuestions));
    start();
    setIsQuizStarted(true);
  };

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

  return (
    <div className="tablet:gap-16 tablet:p-10 desktop:px-64 desktop:py-6 flex flex-col gap-10 desktop:gap-8 p-6">
      {!isQuizStarted ? (
        <FlashCardsForm
          operation={operation}
          numberOfQuestions={numberOfQuestions}
          setNumberOfQuestions={setNumberOfQuestions}
          numberOfDigits={numberOfDigits}
          setNumberOfDigits={setNumberOfDigits}
          isZigzag={isZigzag}
          setIsZigzag={setIsZigzag}
          speed={speed}
          setSpeed={setSpeed}
          numberOfRows={numberOfRows}
          setNumberOfRows={setNumberOfRows}
          includeSubtraction={includeSubtraction}
          setIncludeSubtraction={setIncludeSubtraction}
          persistNumberOfDigits={persistNumberOfDigits}
          setPersistNumberOfDigits={setPersistNumberOfDigits}
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
                      time={totalSeconds!}
                      totalScore={`${totalScore} of ${quizQuestions.length}`}
                      averageTime={averageTime}
                      practiceType="flashcards"
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <PracticeHeader
                practiceType="flashcards"
                questionNumber={currentIndex}
                noOfQuestions={quizQuestions.length}
                minutes={minutes}
                seconds={seconds}
              />
              <div className="tablet:px-4">
                <FlashCardBox
                  speed={speed}
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

export default FlashCardsSection;
