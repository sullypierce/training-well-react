import React, { useContext, useState, useEffect } from "react"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"
import { useNavigate } from 'react-router-dom'
import { ExerciseContext } from "../exercise/ExerciseProvider"



export const SessionForm = () => {
    const navigate = useNavigate()
    const { createSession, getOneSession, editSessionId, updateSession, SessionTypes, getSessionTypes } = useContext(TrainingPlanContext)
    const {exercises, getExercises} = useContext(ExerciseContext)
    const [showForm, setShowForm] = useState(true)
    const [sessionExercises, setSessionExercises]= useState([])
    const [newExercise, setNewExercise] = useState({
        notes: '',
        exercise_id: 0
    })
    
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentSession, setCurrentSession] = useState({
        
        notes: "",
        assigned_date: ""
    })

    
    useEffect(() => {
        getExercises()
        
    }, [])


    const changeSessionState = (event) => {
        const currentSessionState = { ...currentSession }
        currentSessionState[`${event.target.name}`] = event.target.value
        setCurrentSession(currentSessionState)
    }

    const changeExerciseState = (event) => {

    }

    const submitSession = evt => {
        // Prevent form from being submitted
        evt.preventDefault()
        const session = {...currentSession}
        session.time_completed='00:00'
        session.sleep_hours = 0
        session.energy_level = 0
        session.quality = 0
        createSession(session)
        .then((session) => {
            setCurrentSession(session)
            setShowForm(false)
        })
        
    }


    return <> {showForm ?  <form className="SessionForm">
            <h2 className="SessionForm__title">Schedule Session</h2>
            
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">notes: </label>
                    <input type="text" name="notes" required autoFocus className="form-control"
                        value={currentSession.notes}
                        onChange={changeSessionState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="assigned_date">Schedule Date: </label>
                    <input type="date" name="assigned_date" required autoFocus className="form-control"
                        value={currentSession.date_assigned}
                        onChange={changeSessionState}
                    />
                </div>
            </fieldset>

             <button className="btn btn-3"
                    onClick={submitSession}
            >Save</button>
        </form> : <h3>Session</h3>}

        {/* form for adding an exercise to the session */}
        {!showForm ? 
        <>
        <h3>Now Add Exercises</h3>
        <form className='loggedExerciseForm'>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="exercise_id">Exercise: </label>
                    <select type="date" name="exercise_id" required autoFocus className="form-control"
                        value={newExercise.exercise_id}
                        onChange={changeExerciseState}>
                        {exercises.map(exercise => {
                            return <option key={`exercise_${exercise.id}`} value={exercise.id}>{exercise.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">notes: </label>
                    <input type="text" name="notes" required autoFocus className="form-control"
                        value={newExercise.notes}
                        onChange={changeExerciseState}
                    />
                </div>
            </fieldset>
        </form></> : <></> }

        {/* //show the exercises that have been added to the session so far */}
        {sessionExercises.map(exercise => {
            return <div className="card" key={`exercise_${exercise.id}`}>
                <div className='card_item' >{exercise.exercise.name}</div>
                <div className='card_item' >{exercise.notes}</div>
                <div className='card_item' >{exercise.sets}</div>
                <div className='card_item' >{exercise.reps}</div>

            </div>
        })}
        </>
}