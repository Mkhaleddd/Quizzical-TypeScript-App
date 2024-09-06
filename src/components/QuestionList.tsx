import {useState,FC, lazy, useCallback} from 'react';
import { question } from '../App';



interface props<T>
    {
    questions:T[]
    started:boolean
    setQuestions:React.SetStateAction<T>
    Start:T
    }

const Question=lazy(()=>import('./Question'));

const QuestionList :FC<props<any>> =({questions,started,setQuestions,Start}): JSX.Element => {
const[IsCorrect,setIsCorrect]=useState(0);
const[IsChecked,setIsChecked]=useState(false);

  const handleClick=(answer:string,id:string)=>{
    setQuestions((questions :question[])=>questions.map(q=>{
    if (id===q.id) 
    {
      return {...q,selected:answer };
    }
    else return q
     }))}
     
  const Check=()=>{  
          setIsChecked(true);
          let correct=0
          setQuestions((questions :question[])=>questions.map(q=>{return{...q,checked:true}}))  
          questions.forEach(q=>
          {
          if (q.correct===q.selected) correct+=1
          else  return q
          }
      ) 
      setIsCorrect(correct);}
    

  const tryAgain=useCallback(()=>{
    if (IsChecked)
    {
      setIsCorrect(0)
      setIsChecked(false)
      Start()
    }
    else return 
   },[IsChecked])
let disable=questions.find(q=>q.selected===null);

const questionEl=questions.map(question=>{
        return(<Question
             started={started} 
             key={question.id}  
             id={question.id}
             question={question}
             handleClick={handleClick} 
             />) 
           })
  return (
   <section aria-label='questions' >
           {questionEl}
            <br />
            <div className="container">
              <div className="result d-flex">
              {IsChecked?<span>You scored {IsCorrect}/{questions.length} correcr answers</span>:""}
              <button className='btn-primary' onClick={IsChecked?tryAgain:Check} disabled={disable}>{IsChecked?'Try Again':'Check'}</button>
              </div>
            </div>
            <br />
   </section>
  )
}

export default QuestionList