import React from 'react';
import {AnswerObject} from '../App';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props={
    question:string;
    answers:string[];
    callback:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswer:AnswerObject|undefined;
    questionNum:number;
    totalQuestions:number;
}


const QestionCard:React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQuestions,}) => (
 
    <Wrapper>
    <p className="number"> Question:{questionNum}/{totalQuestions};</p>
    <p dangerouslySetInnerHTML={{__html:question}}></p>
    <div>
      {
        answers.map((answer)=>(
        <ButtonWrapper 
        key={answer}
        correct={userAnswer?.correctAnswer === answer}
        userClicked={userAnswer?.answer===answer}
        >
        <button disabled={userAnswer?true:false}value={answer} onClick={callback}></button>
        <span dangerouslySetInnerHTML={{__html:answer}}></span>
         </ButtonWrapper>
                    ))}
            </div>
        </Wrapper>
   
    );

export default QestionCard;