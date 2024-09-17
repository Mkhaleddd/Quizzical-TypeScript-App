import { QuestionType } from '../App';
import  { FC, MouseEvent} from "react";
import { decode } from "html-entities";
import { handleClick } from "../utils";

interface Questionprops{
    key:string
    id:string
    question:QuestionType
    setQuestions:React.Dispatch<React.SetStateAction<QuestionType[]>>
}

const Question :FC<Questionprops> =({question,id,setQuestions}) :JSX.Element=>{
    
   function handleAnswer(answer:string,event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
     event.stopPropagation()
        if (question.checked) return; //answers are checked
         handleClick(answer,id,setQuestions);
    }

function replace(answers :string)  
{
    const replaced=decode(answers)
    return replaced
} 


 let answers : JSX.Element[] |string =question.answers.map((answer :string)=>{
       let id=''
       if (question.selected===answer) id='selected'
       if (question.checked) 
        {    if (question.correct===answer)  id='correct';
            else if (question.selected===answer)  id='incorrect';
        }
        
    return(<>
       <button 
       key={id}  
       id={id} 
       className={`btn-answer ${id} `}
       onClick={(e)=>handleAnswer(answer,e)}
       >
        {replace(answer)}
        </button>
        </>
    )
   })

    return(     
    <div className="container" id="questions">
        <article>
           <h3>{replace(question.question)}</h3>
                       {answers}
        </article>
        
    </div>
        
    )
}
export default  Question 