import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { data } from "../datamanager/DataManager"

export const ExerciseContext = React.createContext()

export const ExerciseProvider = (props) => {
    const [ exercises, setExercises ] = useState([])
    const [ exerciseTypes, setExerciseTypes ] = useState([])
    const [editExerciseId, setEditExerciseId] = useState(0)
    const navigate = useNavigate()

    
    const sendToExerciseForm = (id) => {
        
        setEditExerciseId(id)
        navigate("/exercises/form")
    }
    
    const getExercises = () => {
        return data.get('exercises')
            .then(setExercises)
    }

    const getExerciseTypes = () => {
        return data.get('exercisetypes')
            .then(setExerciseTypes)
    }

    const getOneExercise = (id) => {
        return data.getOne('exercises', id)
    }

    const createExercise = (exercise) => {
        return data.post('exercises', exercise)
    }

    const updateExercise = (exercise) => {
        return data.update('exercises', editExerciseId, exercise)
            .then(() => {
                setEditExerciseId(0)
            })
        }
    

    return (
        <ExerciseContext.Provider value={{ exercises, getExercises, createExercise, updateExercise, getOneExercise, editExerciseId, setEditExerciseId, getExerciseTypes, exerciseTypes, sendToExerciseForm }} >
            { props.children }
        </ExerciseContext.Provider>
    )
}