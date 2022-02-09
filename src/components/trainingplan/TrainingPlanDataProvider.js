import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { data } from "../datamanager/DataManager"

export const TrainingPlanContext = React.createContext()

export const TrainingPlanProvider = (props) => {
    const [ trainingPlan, setTrainingPlan ] = useState([])
    const [sessions, setSessions] = useState([])
    const [ loggedExercises, setLoggedExercises ] = useState([])
    const [editLoggedExerciseId, setEditLoggedExerciseId] = useState(0)
    const navigate = useNavigate()

    
    useEffect(() => {
        getTrainingPlan()
    }, [])
    
    useEffect(() => {
            getSessions()
    }, [trainingPlan])

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

    //custom fetch that only gets the sessions for a users training plan
    const getSessions = () => {
        return fetch(`http://localhost:8000/sessions`, {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("tw_token")}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setSessions(data)
            })
    }
    
    

    return (
        <TrainingPlanContext.Provider value={{ loggedExercises, getLoggedExercises, createLoggedExercise, updateLoggedExercise, sessions, setSessions }} >
            { props.children }
        </TrainingPlanContext.Provider>
    )
}