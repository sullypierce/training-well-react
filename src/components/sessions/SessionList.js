import React, { useContext, useEffect, useState, useRef } from "react"
import './session.css'
import { useNavigate } from "react-router-dom"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"
import { data } from "../datamanager/DataManager"
import { Button } from "../htmlComponents/Button"
import { DeleteModal } from "../htmlComponents/DeleteModal"

export const SessionList = (props) => {
    const { sessions, getSessions, setSingleViewSession, getExercisesBySession, setEditSession, setSingleSessionExercises }  = useContext(TrainingPlanContext)
    const navigate = useNavigate()
    const [nextSession, setNextSession] = useState({})
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [sessionToDelete, setSessionToDelete] = useState({})
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
        data.delete('sessions', session.id)
        .then(getSessions)
    }

    return (
        <article className="sessions">
        <h1 className='border-b-2 m-2 p-2 text-amber-800'>Sessions</h1>
        <Button clickFunction={() => sendToSessionForm({})} buttonText={'Schedule New Session'} classes={'p-2'} />

            {
                sessions.map(session => {
                    return <section id={`session_${session.id}`} key={`session--${session.id}`} ref={session.next_scheduled ? nextSessionRef : null} className={`${session.time_completed != null ? 'card session complete': 'card session tbd'} ${session.next_scheduled ? 'next_session': 'not_next'} bg-gradient-to-tr from-green-400 to-slate-200 border-2`}>

                        <div className="session__date">Date: {session.assigned_date}</div>
                        <div className="session__notes">notes: {session.notes}</div>
                        <div className="flex flex-row justify-end">
                            <Button clickFunction={() => sendToSessionExerciseList(session)} buttonText={"Details/Log"} />
                            
                            <Button clickFunction={() => sendToSessionForm(session)} buttonText = {'Edit'}/>
                           
                            <Button clickFunction = {() => {
                                setSessionToDelete(session)
                                setShowDeleteModal(true)
                                }} 
                                buttonText={'X'} classes='basis-1/12' />
                        
                        </div>
                    </section>
                })
            }
            <DeleteModal show={showDeleteModal} item={sessionToDelete} delete={deleteSession} />
        </article>
    )
}