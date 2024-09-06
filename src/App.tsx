import { useState,useEffect ,ChangeEvent,lazy,Suspense,useCallback}from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import yellowBlob from "./assets/shape-1.png"
import blueBlob from "./assets/shape-2.png"
import Skeleton from './components/Skeleton';


export interface Options {
    category:string
    type:string
    difficulty:string
  }

export interface question {
  [question: string]: any ;
   id: string; 
   question: string; 
   answers:string[];
   checked: boolean; 
   selected: null | string;
   correct: string;
  }

const QuestionList = lazy(() => import('./components/QuestionList'));
const Home =lazy(() => import('./components/Home'));


function App<T extends any[] |any[]>() {
 
  useEffect(()=>{
        [yellowBlob,blueBlob].forEach((picture) => {
       const img=new Image()
       img.src = picture
   
    })},[])

  const [options, setOptions] = useState<Options>(
		{
			category: "",
			difficulty: "",
			type: ""
    }
	);

 const[started,setStarted]=useState<boolean>(false);
 const[questions,setQuestions]=useState<T[]>([]);
 
 const shuffleArr=(arr: T[]):T[]=>{
  arr.sort(()=>Math.random()-0.5)
 return arr
};
  const fetchApi=async()=>{
  try {
    const res= await fetch(`https://opentdb.com/api.php?amount=6
      ${options.category&&`&category=${options.category}`}
      ${options.type&&`&type=${options.type}`}
      ${options.difficulty&&`&difficulty=${options.difficulty}`}
      `);
      if (res.ok) {
    const data =await res.json();
    let q :question | any =[]  
    data.results.forEach((question :question)=>q.push({
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
  useEffect( ()=>{
      fetchApi() 
    },[started])
    

  const handleChange =( event :ChangeEvent<HTMLSelectElement>):void=> {
      const { name , value } = event.currentTarget;
      setOptions(prev => {
        return {
          ...prev,
          [name]: value
        }
      })};
  const Start=useCallback(()=> {
    setStarted(prev=>!prev)
   
  },[started])

   return (
      <>
       <main className='container' > 
         <img src={yellowBlob} alt='yellow blob'  className='top-img'/>
        {!started ?
        <Home 
          Start={Start}
          options={options} 
          handleChange={handleChange}
        />
          :   <Suspense fallback={<Skeleton />}>
                  <QuestionList 
                       started={started}
                       questions={questions}
                       setQuestions={setQuestions}
                       Start={Start}
                     
                       />
            </Suspense>}
             <span>Developed by <a href='https://github.com/Mkhaleddd' target='_blank'>Mariam Khaled</a></span>
             <img src={blueBlob} alt='blue blob' className='bottom-img'/>
           </main>
      </>
      ) 
    }
export default App


