import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ExerciseContext = React.createContext()

export const ExerciseProvider = (props) => {
    const [ trainingPlan, setTrainingPlan ] = useState([])
    const [sessions, setSessions] = useState([])
    const [ loggedExercises, setLoggedExercises ] = useState([])
    const [editLoggedExerciseId, setEditLoggedExerciseId] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        getLoggedExercises()
    }, [trainingPlan])

    const sendToExerciseForm = (id) => {
        
        setEditExerciseId(id)
        navigate("/exercises/form")
    }
    
    const getLoggedExercises = () => {
        return fetch("http://localhost:8000/loggedexercises", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tw_token")}`
            }
        })
            .then(response => response.json())
            .then(setLoggedExercises)
    }

    const getTrainingPlan = () => {
        return fetch("http://localhost:8000/trainingplans", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tw_token")}`
            }
        })
            .then(response => response.json())
            .then(setTrainingPlan)
    }

    const getOneLoggedExercise = (id) => {
        return fetch(`http://localhost:8000/loggedexercises/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tw_token")}`
            }
        })
            .then(response => response.json())
    }

    const createLoggedExercise = (exercise) => {
        return fetch("http://localhost:8000/loggedexercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("tw_token")}`
            },
            body: JSON.stringify(exercise)
         })
            .then(res => res.json())
    }

    const updateLoggedExercise = (exercise) => {
        return fetch(`http://localhost:8000/loggedexercises/${editExerciseId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("tw_token")}`
            },
            body: JSON.stringify(exercise)
         })
            .then(() => {
                setEditExerciseId(0)
            })
        }
    

    return (
        <ExerciseContext.Provider value={{ loggedExercises, getLoggedExercises, createLoggedExercise, updateExercise, getOneExercise, editExerciseId, setEditExerciseId, getExerciseTypes, exerciseTypes, sendToExerciseForm }} >
            { props.children }
        </ExerciseContext.Provider>
    )
}