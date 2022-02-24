import React, { useContext, useEffect, useState, useRef } from "react"
import './session.css'
import { useNavigate } from "react-router-dom"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"
import { data } from "../datamanager/DataManager"

export const SessionList = (props) => {
    const { sessions, getSessions, setSingleViewSession, getExercisesBySession, setEditSession, setSingleSessionExercises }  = useContext(TrainingPlanContext)
    const navigate = useNavigate()
    const [nextSession, setNextSession] = useState({})
    const nextSessionRef = useRef()
    
    const sendToSessionExerciseList = (session) => {
        setSingleViewSession(session)
        getExercisesBySession(session.id)
        .then(() => {
        navigate('/session/details')
        })
    } 


    const sendToSessionForm = (session) => {
        setEditSession(session)
        if(session.id) {
            getExercisesBySession(session.id)
            .then(() => {
                navigate('/sessions/form')
                })
        } else {
            setSingleSessionExercises([])
            navigate("/sessions/form")
        }
    }

    useEffect(() => {
        getSessions()
        
    }, [])

    useEffect(() => {
        if(nextSessionRef.current){
            nextSessionRef.current.scrollIntoView({behavior: "smooth", block: 'center'})
        }
    }, [nextSessionRef])

    const deleteSession = (session) => {
        data.delete(`sessions/${session.id}`)
    }

    return (
        <article className="sessions">
        <h2 className='titlecard'>Sessions</h2>
        <button className="btn btn-2 btn-sep icon-create button"
        onClick={() => sendToSessionForm({})}
        >Schedule New Session</button>
            {
                sessions.map(session => {
                    return <section id={`sesssion_${session.id}`} key={`session--${session.id}`} ref={session.next_scheduled ? nextSessionRef : null} className={`${session.time_completed != null ? 'card session complete': 'card session tbd'} ${session.next_scheduled ? 'next_session': 'not_next'}`}>

                        <div className="session__date">Date: {session.assigned_date}</div>
                        <div className="session__notes">notes: {session.notes}</div>
                        <div className="buttton_div">
                            <button className="btn btn-3 card_button"
                                onClick={() => {sendToSessionExerciseList(session)}}
                            >Details</button>
                            <button className="btn btn-3 card_button"
                                        onClick={() => {sendToSessionForm(session)}}
                            >Edit</button>
                            <button className="btn btn-3 card_button delete_button"
                                        onClick={() => {deleteSession(session)}}
                            >X</button>
                        </div>
                    </section>
                })
            }
        </article>
    )
}