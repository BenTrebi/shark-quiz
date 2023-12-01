import { useState } from "react";
import { resultInitialState } from '../../quiz.js'
import Result from '../Result/result.jsx'
import './quiz.css'


const Quiz = ({questions}) =>  {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const {question, choices, correctAnswer, cover} = questions[currentQuestion];
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);

    const onAnswer = (answer, index) => {
      setAnswerIdx(index);
      if(answer === correctAnswer)  {
        setAnswer(true);
      } else{
        setAnswer(false);
      }
    };

    const onClickNext = () => {
      setAnswerIdx(null);
      setResult((prev) => 
        answer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers +1
        } : {
          ...prev,
          wrongAnswers : prev.wrongAnswers + 1,
        }
      );

      if(currentQuestion !== questions.length -1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setCurrentQuestion(0);
        setShowResult(true);
      }
    };

    const onTryAgain = () =>  {
      setResult(resultInitialState);
      setShowResult(false);
    }

  return  (
    <div className="quiz-container">
        {!showResult ? (<>
        <span className="active-question">{currentQuestion + 1}</span>
        <span className="total-question">/{questions.length}</span>
        <h2>{question}</h2>
        <img alt='img' src={cover} className="sharkImg"></img>
        <ul>
          {
            choices.map((choice, index) => (
              <li 
              onClick={() => onAnswer(choice, index)}
              key={choice}
              className={answerIdx === index ? 'selected-answer' : null}
              >
                {choice}
              </li>
            ))
          }
        </ul>
        <div className="button">
          <button className="nxtBtn" onClick={onClickNext} disabled={answerIdx === null} >
            {currentQuestion === questions.length -1 ? "Finish": "Next"}
          </button>
        </div>
        </>
        ) : (
          <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length}/>
        )}
    </div>
  );
};

export default Quiz;