import React, { useContext, useState, useEffect } from "react"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"
import { useNavigate } from 'react-router-dom'
import { ExerciseContext } from "../exercise/ExerciseProvider"
import { data } from "../datamanager/DataManager"



export const SessionForm = () => {
    const navigate = useNavigate()
    const { createSession, getOneSession, editSessionId, updateSession, SessionTypes, getSessionTypes, editSession, singleSessionExercises, createLoggedExercise } = useContext(TrainingPlanContext)
    const {exercises, getExercises} = useContext(ExerciseContext)
    const [showSessionForm, setShowSessionForm] = useState(true)
    const [showExerciseForm, setShowExerciseForm] = useState(false)
    const [sessionExercises, setSessionExercises]= useState([])
    const [newExercise, setNewExercise] = useState({
        notes: '',
        exercise_id: 1,
        reps: 0,
        sets: 0
    })
    const [currentSession, setCurrentSession] = useState({
        
        notes: "",
        assigned_date: ""
    })

    
    useEffect(() => {
        getExercises()
        if (editSession != {}) {
            setSessionExercises(singleSessionExercises)
            setCurrentSession(editSession)
        } else {
            setSessionExercises([])
            setCurrentSession({
                notes: "",
                assigned_date: ""
            })
        }
        
    }, [])


    const changeSessionState = (event) => {
        const currentSessionState = { ...currentSession }
        currentSessionState[`${event.target.name}`] = event.target.value
        setCurrentSession(currentSessionState)
    }

    const changeExerciseState = (event) => {
        const newExerciseState = {...newExercise}
        newExerciseState[`${event.target.name}`] = event.target.value
        setNewExercise(newExerciseState)
    }

    const submitSession = evt => {
        // Prevent form from being submitted
        evt.preventDefault()
        const session = {...currentSession}
        if (currentSession.id) {
            updateSession(session)
            .then(() => {
                setShowSessionForm(false)
                setShowExerciseForm(true)
            })
        } else {
            
            session.time_completed=null
            session.sleep_hours = 0
            session.energy_level = 0
            session.quality = 0
            createSession(session)
            .then((session) => {
                setCurrentSession(session)
                setShowSessionForm(false)
                setShowExerciseForm(true)
            })
        }
        
    }

    const submitExercise = evt => {
        evt.preventDefault()
        const exercise = {...newExercise}
        exercise.reps = parseInt(exercise.reps)
        exercise.sets = parseInt(exercise.sets)
        if (newExercise.id) {
            data.update('loggedexercises', exercise.id, exercise)
            .then(() => {
                const newExerciseArray = sessionExercises.map((ex) => {
                    if (ex.id != newExercise.id) {
                        return ex
                    }
                })
                newExerciseArray.push(exercise)
                setSessionExercises(newExerciseArray)
                setNewExercise({
                    notes: '',
                    exercise_id: 1,
                    reps: 0,
                    sets: 0
                })
                setShowExerciseForm(false)
            })
        }else {

            exercise.session_id = currentSession.id
            exercise.completed = false
            exercise.weight_used = 0
            createLoggedExercise(exercise)
            .then((exercise)=> {
                const exerciseArray = [...sessionExercises]
                exerciseArray.push(exercise)
                setSessionExercises(exerciseArray)
                setNewExercise({
                    notes: '',
                    exercise_id: 1,
                    reps: 0,
                    sets: 0
                })
            })
        }
    }

    //show session form and then switch to showing newly saved session after submit
    return <> {showSessionForm ?  <form className="SessionForm">
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
                        value={currentSession.assigned_date}
                        onChange={changeSessionState}
                    />
                </div>
            </fieldset>

             <button className="btn btn-3"
                    onClick={submitSession}
            >Save</button>
        </form> : 
        <><h3>Session</h3>
        <div className="session__date">Date: {currentSession.assigned_date}</div>
                        <div className="session__notes">notes: {currentSession.notes}</div>
                        <button className="btn btn-3"
                                    onClick={() => {setShowSessionForm(true)}}
                                    >Edit</button></>}

        {/* form for adding an exercise to the session, only show after saving a new session or if editing a session */}
        {showExerciseForm ? 
        <>
        <h3>Now Add Exercises</h3>
        <form className='loggedExerciseForm'>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="exercise_id">Exercise: </label>
                    <select type="date" name="exercise_id" required autoFocus className="form-control"
                        value={newExercise.exercise ? newExercise.exercise.id: newExercise.exercise_id}
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="sets">sets: </label>
                    <input type="number" name="sets" required autoFocus className="form-control"
                        value={newExercise.sets}
                        onChange={changeExerciseState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reps">reps: </label>
                    <input type="number" name="reps" required autoFocus className="form-control"
                        value={newExercise.reps}
                        onChange={changeExerciseState}
                    />
                </div>
            </fieldset>
            <button className="btn btn-3"
                    onClick={submitExercise}
            >Save</button>
        </form></> : <></> }

        {/* //show the exercises that have been added to the session so far */}
        {sessionExercises.map(exercise => {
            if (exercise != undefined) {
            return <div className="card" key={`exercise_${exercise.id}`}>
                <div className='card_item' >{exercise.exercise.name}</div>
                <div className='card_item' >{exercise.notes}</div>
                <div className='card_item' >{exercise.sets}</div>
                <div className='card_item' >{exercise.reps}</div>
                <button className="btn btn-3"
                    onClick={() => {
                        setNewExercise(exercise)
                        setShowExerciseForm(true)
                        }}
                >Edit</button>
            </div>
            }
        })}
        </>
}