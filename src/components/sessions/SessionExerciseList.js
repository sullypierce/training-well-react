import React, { useContext, useEffect, useState } from "react"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"

export const SessionExerciseList = (props) => {
    const { singleViewSession, singleSessionExercises }  = useContext(TrainingPlanContext)
    
    //hold the time completed if entered 
    const [sessionCompleted, setSessionCompleted] = useState({...singleViewSession});

    //hold the exercises so they can be edited if the user chooses to log this session
    const [thisSessionExercises, setThisSessionExercises] = useState([]);

    useEffect(() => {
        const exerciseArray = singleSessionExercises
        setThisSessionExercises(exerciseArray)
    }, [singleSessionExercises])

    const changeState = (event) => {
        const elementName = event.target.name.split('__')[0]
        //if element changed is part of session
        if (elementName == 'session') {
            const editSession = {...sessionCompleted}
            editSession[event.target.name.split('__')[1]] = event.target.value
            setSessionCompleted(editSession)
        } else {
        //if element changed corresponds to an exercise
        const exercisesCopy = [...thisSessionExercises]
        const exerciseId = event.target.name.split('__')[1]
        //cycle through the exercises and change the state of the correct one
        const newState = exercisesCopy.map((exercise) => {
            if (exercise.id == exerciseId){
                if (elementName=='completed') {
                    exercise[elementName] =event.target.checked
                } else {
                    exercise[elementName] = event.target.value
                }
            }
            return exercise
        })
        setThisSessionExercises(newState)
    }}

    const numArray = [1,2,3,4,5,6,7,8,9,10]
    const qualityWords = ['Terrible', 'Bad', 'Average', 'Good', 'Great']
    const qualityNumbers = [1,2,3,4,5]

    return (
        <article className="sessions">
        <h2>Sessions</h2>
        <button className="btn btn-2 btn-sep icon-create"
        //onClick={() => sendToExerciseForm(0)}
        >Log Session</button>
        <div className="session">
        <h3>{singleViewSession.assigned_date}</h3>
            <h3>{singleViewSession.notes}</h3>
            <label htmlFor={`session__time_completed`}>Time Completed:</label>
            <input name="session__time_completed" type={'time'} onChange={changeState} value={sessionCompleted.time_completed != null ? sessionCompleted.time_completed : '00:00'}/>
            <label htmlFor={`session__sleep_hours`}>Hours of Sleep last Night:</label>
            <select name="session__sleep_hours"  onChange={changeState} value={sessionCompleted.sleep_hours}>
                {
                    
                    numArray.map(num => <option key={num}>{num}</option>)
                }
            </select>
            <label htmlFor={`session__energy_level`}>Starting Energy Level (1-10):</label>
            <select name="session__energy_level"  onChange={changeState} value={sessionCompleted.energy_level}>
                {
                    
                    numArray.map(num => <option key={num}>{num}</option>)
                }
            </select>
            <label htmlFor={`session__quality`}>Workout Quality:</label>
            <select name="session__quality"  onChange={changeState} value={sessionCompleted.quality}>
                {
                    
                    qualityNumbers.map(num => <option key={num} value={num}>{qualityWords[num-1]}</option>)
                }
            </select>
        </div>
            
            
            {
                singleSessionExercises.map(singleSessionExercise => {
                    return <section key={`singleSessionExercise--${singleSessionExercise.id}`} className="singleSessionExercise">

                        <div className="singleSessionExercise__date">Exercise: {singleSessionExercise.exercise.name}</div>
                        <label htmlFor={`notes__${singleSessionExercise.id}`}>Notes:</label>
                        <input type={'text'} name={`notes__${singleSessionExercise.id}`} className="singleSessionExercise__notes" value={singleSessionExercise.notes} onChange={changeState}/>
                        <div className="singleSessionExercise__sets">sets: {singleSessionExercise.sets}</div>
                        <div className="singleSessionExercise__reps">reps: {singleSessionExercise.reps}</div>
                        <div className="singleSessionExercise__weight">weight: {singleSessionExercise.weight_used}</div>
                        <label htmlFor={`completed__${singleSessionExercise.id}`}>Completed</label>
                        <input name={`completed__${singleSessionExercise.id}`} type='checkbox' value={singleSessionExercise.completed} onChange={changeState}/>

                        {/* <button className="btn btn-3"
                                    onClick={() => {sendTosingleSessionExerciseForm(singleSessionExercise.id)}}
                                    >Edit</button> */}
                    </section>
                })
            }
        </article>
    )
}