import { nanoid } from "nanoid";
import { question } from '../App';
import  { FC} from "react";
import { decode } from "html-entities";

interface props{
    started:boolean 
    key:string
    id:string
    question:question
    handleClick:any
}

 const Question :FC<props> =(props) :JSX.Element=>{
 
function handleAnswer(answer :string)
{
    if (props.question.checked) return; //answers are checked
     props.handleClick(answer,props.id);

}   

function replace(answers :string)  
{
    const replaced=decode(answers)
    return replaced
} 

 
 let answers : JSX.Element[] =props.question.answers.map((answer :string)=>{
       let id=''
       if (props.question.selected===answer) id='selected'
       if (props.question.checked) 
        {    if (props.question.correct===answer)  id='correct';
            else if (props.question.selected===answer)  id='incorrect';
        }    
    return(
        <>
       <button key={nanoid()} 
       onClick={()=>handleAnswer(answer)}  
       id={id} 
       
       className='btn-answer'
       >
        {replace(answer)}
        </button>
        </>
    )
    

})

    return(     
    <div className="container">
        <article>
           <h3>{replace(props.question.question)}</h3>
                  <br/>
                    <div>
                       {answers}
                    </div>
        </article>
        
    </div>
        
    )
}
export default  Question 