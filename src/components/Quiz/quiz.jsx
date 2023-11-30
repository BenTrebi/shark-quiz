import { useState } from "react";
import { resultInitialState } from '../../quiz.js'



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
        <img alt='img' src={cover} ></img>
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
        <div className="footer">
          <button onClick={onClickNext} disabled={answerIdx === null}>
            {currentQuestion === questions.length -1 ? "Finish": "Next"}
          </button>
        </div>
        </>) : <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={onTryAgain}>Try Again</button>
           
          </div>}
      
    </div>
  );
};

export default Quiz;