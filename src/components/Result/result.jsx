import { useState, useEffect } from "react";
import './result.css'


const Result = ({totalQuestions, result, onTryAgain}) =>  {

  const [name, setName] = useState('');
  const [highScores, setHighScores] = useState([]);
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    setHighScores(JSON.parse(localStorage.getItem('highScores')) || [] );
  }, []);


  const handleSave = () =>  {
    const score = {
      name, 
      score: result.score
    };

  const handleTryAgain = () =>  {
    setShowScores(false);
    setHighScores([]);
    onTryAgain();
  }



    const newHighScores = [...highScores, score].sort
    ((a,b) => b.score - a.score
    );


    setHighScores(newHighScores);
    setShowScores(true);
    localStorage.setItem('highScores', JSON.stringify(newHighScores))
  };

  return  (
  <div className="result">
    <h2>Result</h2>
    <p className="results">
    Total Questions: <span>{totalQuestions}</span>
   </p>
    <p className="results">
    Total Score: <span>{result.score}</span>
    </p>
   <p className="results">
    Correct Answers: <span>{result.correctAnswers}</span>
    </p>
   <p className="results">
    Wrong Answers: <span>{result.wrongAnswers}</span>
    </p>
    <button className= 'tryAgainBtn' onClick={onTryAgain}>Try Again</button>
   {!showScores ? <>
    <h3>
      Enter your name below to save your score!
    </h3>
    <input 
    className="input"
    value={name} 
    onChange={(evt) => setName(evt.target.value)} />
    <button className= 'saveBtn' onClick={handleSave}>Save</button>
   </> :  <>
   <table className="rankingTable">
    <thead >
      <tr>
          <th>Ranking</th>
          <th>Name</th>
          <th>Score</th>
      </tr>
      </thead>
      <tbody>
          {highScores.map((highScores, i) => {
            return (
              <tr key={` ${highScores.score}${highScores.name}${i} `}>
              <td>{i + 1}</td>
              <td>{highScores.name}</td>
              <td>{highScores.score}</td>
              </tr>
            );
          })}
      </tbody>
   </table>
   </>}

    

  </div>
  );
}

export default Result;