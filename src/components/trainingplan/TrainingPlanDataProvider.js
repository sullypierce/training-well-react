import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { data } from "../datamanager/DataManager"

export const TrainingPlanContext = React.createContext()

export const TrainingPlanProvider = (props) => {
    const [ trainingPlan, setTrainingPlan ] = useState([])
    const [sessions, setSessions] = useState([])

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
    

    useEffect(() => {
        getExercisesBySession(singleViewSession.id)
    }, [singleViewSession])

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
        return data.post('loggedexercise', exercise)
    }

    const updateLoggedExercise = (exercise) => {
        return data.update('loggedexercise', editLoggedExerciseId, exercise)
            .then(() => {
                setEditLoggedExerciseId(0)
            })
        }

    const getTrainingPlan = () => {
        return data.get('trainingplans')
            .then(setTrainingPlan)
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
        <TrainingPlanContext.Provider value={{ loggedExercises, getLoggedExercises, createLoggedExercise, updateLoggedExercise, sessions, setSessions, singleViewSession, setSingleViewSession, singleSessionExercises }} >
            { props.children }
        </TrainingPlanContext.Provider>
    )
}