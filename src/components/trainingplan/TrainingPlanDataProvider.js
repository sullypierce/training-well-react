import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { data } from "../datamanager/DataManager"

export const TrainingPlanContext = React.createContext()

export const TrainingPlanProvider = (props) => {
    const [ trainingPlan, setTrainingPlan ] = useState([])
    const [sessions, setSessions] = useState([])
    const [editSession, setEditSession] = useState({})

    //holds a single session when you go to a detail view
    const [singleViewSession, setSingleViewSession] = useState({})
    //holds the exercises for a single session when you go to a detail view
    const [singleSessionExercises, setSingleSessionExercises] = useState([])

    const [ loggedExercises, setLoggedExercises ] = useState([])
    const [editLoggedExerciseId, setEditLoggedExerciseId] = useState(0)
    const navigate = useNavigate()

    
    useEffect(() => {
        getTrainingPlan()
        getSessions()
    }, [])
    

    // const sendToExerciseForm = (id) => {
        
    //     setEditExerciseId(id)
    //     navigate("/exercises/form")
    // }
    
    const getLoggedExercises = () => {
        return data.get('loggedexercises')
            .then(setLoggedExercises)
    }
    
    const getOneLoggedExercise = (id) => {
        return data.getOne('loggedexercises', id)
    }

    const createLoggedExercise = (exercise) => {
        return data.post('loggedexercises', exercise)
    }

    const updateLoggedExercise = (exercise) => {
        return data.update('loggedexercises', editLoggedExerciseId, exercise)
            .then(() => {
                setEditLoggedExerciseId(0)
            })
        }

    const getTrainingPlan = () => {
        return data.get('trainingplans')
            .then(setTrainingPlan)
    }

    const createSession = (session) => {
        return data.post('sessions', session)
        
    }

    const getSessions = () => {
        return data.get('sessions')
            .then((data) => {
                setSessions(data)
            })
    }

    const getExercisesBySession = (id) => {
        return data.get(`loggedexercises?session_id=${id}`)
            .then(setSingleSessionExercises)
    }
    
    

    return (
        <TrainingPlanContext.Provider value={{ loggedExercises, getLoggedExercises, createLoggedExercise, updateLoggedExercise, sessions, setSessions, 
        singleViewSession, setSingleViewSession, singleSessionExercises, setSingleSessionExercises, getSessions, createSession, getExercisesBySession, editSession, setEditSession }} >
            { props.children }
        </TrainingPlanContext.Provider>
    )
}