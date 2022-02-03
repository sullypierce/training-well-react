import React, { useState } from "react"

export const ExerciseContext = React.createContext()

export const ExerciseProvider = (props) => {
    const [ exercises, setExercises ] = useState([])
    const [editExerciseId, setEditExerciseId] = useState(0)

    const getExercises = () => {
        return fetch("http://localhost:8000/exercises", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tw_token")}`
            }
        })
            .then(response => response.json())
            .then(setExercises)
    }

    const getOneExercise = (id) => {
        return fetch(`http://localhost:8000/exercises/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tw_token")}`
            }
        })
            .then(response => response.json())
    }

    const createExercise = (exercise) => {
        return fetch("http://localhost:8000/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("tw_token")}`
            },
            body: JSON.stringify(exercise)
         })
            .then(res => res.json())
    }

    const updateExercise = (exercise) => {
        return fetch(`http://localhost:8000/exercises/${editExerciseId}`, {
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
        <ExerciseContext.Provider value={{ exercises, getExercises, createExercise, updateExercise, getOneExercise, editExerciseId, setEditExerciseId }} >
            { props.children }
        </ExerciseContext.Provider>
    )
}