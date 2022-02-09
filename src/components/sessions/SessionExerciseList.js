import React, { useContext, useEffect, useState } from "react"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"

export const SessionExerciseList = (props) => {
    const { singleViewSession, singleSessionExercises }  = useContext(TrainingPlanContext)
    
    //hold the time completed if entered 
    const [sessionTimeCompleted, setSessionTimeCompleted] = useState('');

    //hold the exercises so they can be edited if the user chooses to log this session
    const [thisSessionExercises, setThisSessionExercises] = useState([]);

    useEffect(() => {
        const exerciseArray = singleSessionExercises
        setThisSessionExercises(exerciseArray)
    }, [singleSessionExercises])

    const changeState = (event) => {
        const exercisesCopy = [...thisSessionExercises]
        const elementName = event.target.name.split('_')[0]
        const exerciseId = event.target.name.split('_')[1]
        const newState = exercisesCopy.map((exercise) => {
            if (exercise.id == exerciseId){
                exercise[elementName] = event.target.value
                return exercise
            }
        })
        setThisSessionExercises(newState)
    }

    return (
        <article className="sessions">
        <h2>Sessions</h2>
        <button className="btn btn-2 btn-sep icon-create"
        //onClick={() => sendToExerciseForm(0)}
        >Log Session</button>
            <h3>{singleViewSession.assigned_date}</h3>
            <h3>{singleViewSession.notes}</h3>
            {
                singleSessionExercises.map(singleSessionExercise => {
                    return <section key={`singleSessionExercise--${singleSessionExercise.id}`} className="singleSessionExercise">

                        <div className="singleSessionExercise__date">Exercise: {singleSessionExercise.exercise.name}</div>
                        <label htmlFor={`completed_${singleSessionExercise.id}`}>Notes:</label>
                        <input type={'text'} name={`notes_${singleSessionExercise.id}`} className="singleSessionExercise__notes" value={singleSessionExercise.notes} onChange={changeState}/>
                        <div className="singleSessionExercise__notes">sets: {singleSessionExercise.sets}</div>
                        <div className="singleSessionExercise__notes">reps: {singleSessionExercise.reps}</div>
                        <div className="singleSessionExercise__notes">weight: {singleSessionExercise.weight_used}</div>
                        <label htmlFor={`completed_${singleSessionExercise.id}`}>Completed</label>
                        <input name={`completed_${singleSessionExercise.id}`} type='checkbox' value={singleSessionExercise.completed} onChange={changeState}/>

                        {/* <button className="btn btn-3"
                                    onClick={() => {sendTosingleSessionExerciseForm(singleSessionExercise.id)}}
                                    >Edit</button> */}
                    </section>
                })
            }
        </article>
    )
}