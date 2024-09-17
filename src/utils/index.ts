import { ChangeEvent } from "react";
import { OptionsType, QuestionType } from "../App";
import { nanoid } from 'nanoid';



export const handleChange =(  event:ChangeEvent<HTMLSelectElement>, setOptions:React.Dispatch<React.SetStateAction<OptionsType>>):void=> {
    const { name , value } = event.currentTarget;
    setOptions(prev => {
      return {
        ...prev,
        [name]: value
      }
    })};

    const shuffleArr=(arr: QuestionType[]):QuestionType[]=>{
        arr.sort(()=>Math.random()-0.5)
       return arr
      };
     interface FetchApiArgs{
        options:OptionsType
        setQuestions:React.Dispatch<React.SetStateAction<QuestionType[]>>
     } 
    export  const fetchApi=async({options,setQuestions}: FetchApiArgs)=>{
        try {
          const res= await fetch(`https://opentdb.com/api.php?amount=6
            ${options.category&&`&category=${options.category}`}
            ${options.type&&`&type=${options.type}`}
            ${options.difficulty&&`&difficulty=${options.difficulty}`}
            `);
            if (res.ok) {
          const data =await res.json();
          console.log(data)
          let q :QuestionType | any =[]  
          data.results.forEach((question :QuestionType)=>q.push({
            id:nanoid() ,
            question:question.question,
            answers:shuffleArr([...question.incorrect_answers,question.correct_answer]), 
            checked:false,
            selected:null,
            correct:question.correct_answer,
          }
          ))
          setQuestions(q)
        }
        } catch {
          throw new Error("couldnt fetch the trivia api")
        }
    }
      interface checkArgs{
        setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
        setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>
        setIsCorrect: React.Dispatch<React.SetStateAction<number>>
        questions: QuestionType[]
       } 
      export const check = 
          ({setIsChecked,
          setQuestions,
          setIsCorrect,
          questions}:
           checkArgs)=> {
          setIsChecked(true);
          const correctCount = questions.reduce((count, q) => {
              if (q.correct === q.selected) {
                  count += 1;
              }
              return count;
          }, 0);

          setQuestions(questions.map(q => ({ ...q, checked: true })));
          setIsCorrect(correctCount);
      }
      export const handleClick = (answer: string, id: string, setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>) => {
        setQuestions(questions => questions.map(q => id === q.id ? { ...q, selected: answer } : q));
    };
       

    
    
    
