import React, { useState } from 'react';
import logo from './logo.svg';
import QuestionCard from './components/QestionCard';
import {fetchQuizQuestion, QuestionsState} from './API';
import {Difficulty}from './API';
import { GlobalStyle, Wrapper } from './App.styles';
import './App.css';
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
function App() {
  const [loading,setLoading]=useState(false);
  const [questions,setQuestions]=useState<QuestionsState[]>([]);
  const [number,setNumber]=useState(0);
  const [userAnswers,setUserAnswers]=useState<AnswerObject[]>([]);
  const [score,setScore]=useState(0);
  const [gameOver,setGameOver]=useState(true);
  const Total_Question=10;
  
  console.log(fetchQuizQuestion(Total_Question,Difficulty.EASY));
  console.log("questions=",questions);

  const startsTrivia = async()=>{
    setLoading(true);
    setGameOver(false);

    const newQuestions=await fetchQuizQuestion(
      Total_Question,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  console.log("qs=",questions);
  const checkAnswer=(e:any)=>{
    if(!gameOver){
      //users answer
      const answer=e.currentTarget.value;
      //check answer
      const correct=questions[number].correct_answer===answer;
      //add score
      if(correct) setScore((prev) => prev + 1);
      
      //Save answer in the array for users answer
  const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer,
      };
      setUserAnswers((prev)=>[...prev,answerObject]);
    }
  }
  const nextQuestion=()=>{
    const nextQuestion=number+1;
    if(nextQuestion===Total_Question){
      setGameOver(true);
    }
    else{
      setNumber(nextQuestion);
    }
  }
  return (
   <>
    <GlobalStyle />
    <Wrapper>
     <h1>QUIZ</h1>
     {
       gameOver||userAnswers.length===Total_Question?
       (<button className="start" onClick={startsTrivia}>Start</button>):null
     }
     {
       !gameOver?<p className="score">Score:</p>:null
     }
     {
       loading&&<p>Loading......</p>
     }
     {!loading&&!gameOver&&(
     <QuestionCard
     questionNum={number+1}
     totalQuestions={Total_Question}
     question={questions[number].question}
     answers={questions[number].answers}
     userAnswer={userAnswers?userAnswers[number]:undefined}
     callback={checkAnswer}
     /> )}
     {!gameOver&&
     !loading&&
     userAnswers.length===number+1 && number!==Total_Question-1 ? (
           <button className='next' onClick={nextQuestion}>Next Question</button>
     ):null }

    </Wrapper></>
  );
}

export default App;
