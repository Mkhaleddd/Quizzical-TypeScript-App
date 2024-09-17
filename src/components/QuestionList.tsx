import {useState,FC, lazy, useCallback} from 'react';
import { QuestionType } from '../App';
import {check} from "../utils/index"


interface QuestionListprops
    {
    questions:QuestionType[]
    setQuestions:React.Dispatch<React.SetStateAction<QuestionType[]>>
    start:()=>void
    }

const Question=lazy(()=>import('./Question'));

const QuestionList :FC<QuestionListprops> =({questions,setQuestions,start}): JSX.Element => {
const[IsCorrect,setIsCorrect]=useState(0);
const[IsChecked,setIsChecked]=useState(false);
 
  const tryAgain=useCallback(()=>{
    if (IsChecked)
    {
      setIsCorrect(0)
      setIsChecked(false)
      start()
    }
    else return 
   },[IsChecked])

// Check if there are any questions with a null selected answer
let disable :boolean=questions.some(q=>q.selected===null);

const questionEls=questions.map(question=>{
        return(<Question
             key={question.id}  
             id={question.id}
             question={question}
             setQuestions={setQuestions}
             />) 
           })
  

  return (
   <section aria-label='questions' >
           {questionEls}
            <br />
            <div className="container">
              <div className="result d-flex">
              {IsChecked&&<span>You scored {IsCorrect}/{questions.length} correcr answers</span>}
              <button className='btn-primary' 
              onClick={_=>IsChecked?tryAgain():check({setIsChecked,setQuestions,setIsCorrect,questions})}
               disabled={disable}>
                {IsChecked?'Try Again':'Check'}
                </button>
              </div>
            </div>
            <br />
   </section>
  )
}

export default QuestionList