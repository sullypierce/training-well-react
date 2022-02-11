import React, { useContext, useEffect } from "react"
import './session.css'
import { useNavigate } from "react-router-dom"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"

export const SessionList = (props) => {
    const { sessions, setSessions, setSingleViewSession, getExercisesBySession }  = useContext(TrainingPlanContext)
    const navigate = useNavigate()
    
    const sendToSessionExerciseList = (session) => {
        setSingleViewSession(session)
        getExercisesBySession(session.id)
        .then(() => {
        navigate('/session/details')
        })
    } 

    const sendToSessionForm = () => {
        navigate("/sessions/new")
    }

    return (
        <article className="sessions">
        <h2 className='titlecard'>Sessions</h2>
        <button className="btn btn-2 btn-sep icon-create button"
        onClick={sendToSessionForm}
        >Schedule New Session</button>
            {
                sessions.map(session => {
                    return <section key={`session--${session.id}`} className={session.time_completed != null ? 'card session complete': 'card session tbd'}>

                        <div className="session__date">Date: {session.assigned_date}</div>
                        <div className="session__notes">notes: {session.notes}</div>
                        {/* <button className="btn btn-3"
                                    onClick={() => {sendToSessionForm(session.id)}}
                                    >Edit</button> */}
                        <button className="btn btn-3"
                            onClick={() => {sendToSessionExerciseList(session)}}
                        >Details</button>
                    </section>
                })
            }
        </article>
    )
}