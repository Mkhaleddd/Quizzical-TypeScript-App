import { useState,useEffect ,lazy,Suspense,useCallback}from 'react';
import { fetchApi } from './utils';
import './App.css';

import yellowBlob from "./assets/shape-1.png"
import blueBlob from "./assets/shape-2.png"
import Skeleton from './components/Skeleton';
import Loader from './components/Loader';


export interface OptionsType {
    category:string
    type:string
    difficulty:string
  }

export interface QuestionType {
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


function App() {
 
  useEffect(()=>{
        [yellowBlob,blueBlob].forEach((picture) => {
       const img=new Image()
       img.src = picture
   
    })},[])

  const [options, setOptions] = useState<OptionsType>(
		{
			category: "",
			difficulty: "",
			type: ""
    }
	);

 const[started,setStarted]=useState<boolean>(false);
 const[questions,setQuestions]=useState<QuestionType[]>([]);
 


  useEffect( ()=>{
    if (started || options) {
      fetchApi({ options, setQuestions });
  }
    },[started,options])
    

 
  const start=useCallback(()=> {setStarted(prev=>!prev)},[])

   return (
      <>
       <main className='container' > 
         <img src={yellowBlob} alt='yellow blob'  className='top-img'/>
        {!started ?
        <Suspense fallback={<Loader />}>
                    <Home 
                    Start={start}
                    options={options} 
                    setOptions={setOptions}
                  />
        </Suspense>
          :
        <Suspense fallback={<Skeleton />}>
                  <QuestionList
                       questions={questions}
                       setQuestions={setQuestions}
                       start={start}
                       />
        </Suspense>}
             <span>Developed by <a href='https://github.com/Mkhaleddd' target='_blank'>Mariam Khaled</a></span>
             <img src={blueBlob} alt='blue blob' className='bottom-img'/>
           </main>
      </>
      ) 
    }
export default App


