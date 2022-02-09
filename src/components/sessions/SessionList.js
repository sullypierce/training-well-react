import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"

export const SessionList = (props) => {
    const { sessions, setSessions, setSingleViewSession }  = useContext(TrainingPlanContext)
    const navigate = useNavigate()
    
    const sendToSessionExerciseList = (session) => {
        setSingleViewSession(session)
        navigate('/session/details')
    } 

    return (
        <article className="sessions">
        <h2>Sessions</h2>
        <button className="btn btn-2 btn-sep icon-create"
        //onClick={() => sendToExerciseForm(0)}
        >Schedule New Session</button>
            {
                sessions.map(session => {
                    return <section key={`session--${session.id}`} className="session">

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