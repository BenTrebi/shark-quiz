import { useState, useEffect } from "react";


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
    <h3>Result</h3>
    <p>
    Total Questions: <span>{totalQuestions}</span>
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
   {!showScores ? <>
    <h3>
      Enter your name below to save your score!
    </h3>
    <input 
    value={name} 
    onChange={(evt) => setName(evt.target.value)} />
    <button onClick={handleSave}>Save</button>
   </> :  <>
   <table>
    <thead>
      <tr>
          <th>Ranking</th>
          <th>Name</th>
          <th>Score</th>
      </tr>
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
    </thead>
   </table>
   </>}

    

  </div>
  );
}

export default Result;