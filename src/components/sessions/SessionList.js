import React, { useContext, useEffect, useState, useRef } from "react"
import './session.css'
import { useNavigate } from "react-router-dom"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"

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
        const today = new Date()
        const month = today.getMonth()+1
        const day= today.getDate()
        const year = today.getFullYear()
        console.log(today)
        console.log(month, day, year)
        
        for (let session of sessions) {
            const dateArray = session.assigned_date.split('-')
            console.log(dateArray)
            const isNextSession = () => {
                if (dateArray[0] >= year && parseInt(dateArray[1]) > month) {
                    return true
                } else if (dateArray[0] >= year && parseInt(dateArray[1]) == month && parseInt(dateArray[2]) >= day ) {
                    return true
                } else { return false}
            }
            if (isNextSession()){
                console.log('setting today session')
                setNextSession(session)
                break
            }
        }
    }, [])

    useEffect(() => {
        if(nextSessionRef.current){

           // nextSessionRef.current.scrollIntoView({behavior: "smooth"})
        }
    }, [nextSessionRef])

    return (
        <article className="sessions">
        <h2 className='titlecard'>Sessions</h2>
        <button className="btn btn-2 btn-sep icon-create button"
        onClick={() => sendToSessionForm({})}
        >Schedule New Session</button>
            {
                sessions.map(session => {
                    return <section id={`sesssion_${session.id}`} key={`session--${session.id}`} ref={nextSession.id == session.id ? nextSessionRef : null} className={session.time_completed != null ? 'card session complete': 'card session tbd'}>

                        <div className="session__date">Date: {session.assigned_date}</div>
                        <div className="session__notes">notes: {session.notes}</div>
                        <button className="btn btn-3"
                                    onClick={() => {sendToSessionForm(session)}}
                                    >Edit</button>
                        <button className="btn btn-3"
                            onClick={() => {sendToSessionExerciseList(session)}}
                        >Details</button>
                    </section>
                })
            }
        </article>
    )
}