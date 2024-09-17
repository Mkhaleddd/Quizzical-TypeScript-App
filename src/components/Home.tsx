import { FC, SetStateAction } from "react"
import {OptionsType} from "../App"
import { handleChange } from "../utils"
import { selectOptions} from "../constants"

 interface props{
    options: OptionsType
    Start:React.MouseEventHandler<HTMLButtonElement> | undefined
	setOptions:React.Dispatch<SetStateAction<OptionsType>>
 }
const Home :FC<props>=({options,Start,setOptions}): JSX.Element=> { 
  return (
    <section>
        <section  className="started" aria-label='Started'>
          <h1 className='title'>Quizzical</h1> 
          <h2>Answer the questions and test your knowledge!</h2>
          <div className="gameOptions-container">
							
							{Object.entries(selectOptions).map(([key,value])=>(
								<div className="select-container" key={key}>
								<label 
								htmlFor={key}
								className="custom-label"
								>
									 {key.charAt(0).toUpperCase() + key.slice(1)}:
								</label>
								<select 	
								   name={key}
									id={key}
									className="custom-select"
									value={options[key as keyof OptionsType]}
									onChange={(e)=>handleChange(e,setOptions)}
									>
										{value.map(option=>(
											<option 
											value={option.value}
											key={option.value}
											>
												{option.label}
											</option>
									))}
								</select>
								</div>
								
								
							))}
								
							</div>
          <button className='btn-primary' onClick={Start}>Start</button>
        </section>
    </section>
  )
}

export default Home