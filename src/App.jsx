import React from 'react'
import Header from './components/Header/header.jsx'
import Footer from './components/Footer/footer.jsx'
import { sharkQuiz } from './quiz.js'
import Quiz from './components/Quiz/quiz.jsx'


function App() {

  return (
    <div className='App'>
      <Header />
      <Quiz questions={sharkQuiz.questions} />
      <Footer />
    </div>
  )
}

export default App;
