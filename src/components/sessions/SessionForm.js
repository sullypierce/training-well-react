import React, { useContext, useState, useEffect } from "react"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"
import { useNavigate } from 'react-router-dom'
import { ExerciseContext } from "../exercise/ExerciseProvider"


export const SessionForm = () => {
    const navigate = useNavigate()
    const { createSession, getOneSession, editSessionId, updateSession, SessionTypes, getSessionTypes } = useContext(TrainingPlanContext)
    const {exercises, getExercises} = useContext(ExerciseContext)
    const [newSession, setNewSession] = useState()
    const [showForm, setShowForm] = useState(true)
    
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentSession, setCurrentSession] = useState({
        Session_type_id: "1",
        description: "",
        url: "",
        name: ""
    })

    
    useEffect(() => {
        getExercises()
        
    }, [])


    const changeSessionState = (event) => {
        const newSessionState = { ...currentSession }
        newSessionState[`${event.target.name}`] = event.target.value
        setCurrentSession(newSessionState)
    }

    const submitSession = evt => {
        // Prevent form from being submitted
        evt.preventDefault()

        setShowForm(false)
        
    }


    return <> {showForm ?  <form className="SessionForm">
            <h2 className="SessionForm__title">Schedule Session</h2>
            
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">notes: </label>
                    <input type="text" name="notes" required autoFocus className="form-control"
                        // value={newSession.notes}
                        onChange={changeSessionState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        // value={newSession.date}
                        onChange={changeSessionState}
                    />
                </div>
            </fieldset>
            
            

             <button className="btn btn-3"
                    onClick={submitSession}
            >Save</button>
                                
        </form> : <h3>Session</h3>}
        </>
}