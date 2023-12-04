import React from 'react'
import Header from './components/Header/header.jsx'
import { sharkQuiz } from './quiz.js'
import Quiz from './components/Quiz/quiz.jsx'


function App() {

  return (
    <div className='App'>
      <Header />
      <Quiz questions={sharkQuiz.questions} />
    </div>
  )
}

export default App;
