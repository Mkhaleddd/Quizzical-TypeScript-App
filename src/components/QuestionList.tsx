import {useState,FC, lazy, useMemo} from 'react';
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

  function handleClick (answer:string,id:string){
    setQuestions((questions :question[])=>questions.map(q=>{
    if (id===q.id) {
      return {...q,selected:answer };
    }
      else return q;
     
    }
      ))

    }
  
   function Check() 
      {   if (questions.find(q=>q.selected===null)) return  //all  questions are answered
          setIsChecked(true);
          let correct=0
          setQuestions((questions :question[])=>questions.map(q=>{return{...q,checked:true}}))  
          questions.forEach(q=>
          {
          if (q.correct===q.selected)correct+=1;
          else  return q
          }
      ) 
      setIsCorrect(correct);}

   function tryAgain() {
    if (IsChecked) {
      setIsCorrect(0)
      setIsChecked(false)
      Start()
    }
    else return 
   }
const questionEl=useMemo(()=>questions.map(question=>{
        return(<Question
             started={started} 
             key={question.id}  
             id={question.id}
             question={question}
             handleClick={handleClick} 
             />) 
           }),[questions] )
  return (
   <section aria-label='questions'>
           {questionEl}
            <br />
            <div className="container">
              <div className="result d-flex">
              {IsChecked?<span>You scored {IsCorrect}/{questions.length} correcr answers</span>:""}
              <button className='btn-primary' onClick={IsChecked?tryAgain:Check} >{IsChecked?'Try Again':'Check'}</button>
              </div>
            </div>
            <br />
   </section>
  )
}

export default QuestionList