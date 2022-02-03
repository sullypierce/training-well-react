import React, { useContext, useState, useEffect } from "react"
import { ExerciseContext } from "./ExerciseProvider.js"
import { useNavigate } from 'react-router-dom'


export const ExerciseForm = () => {
    const navigate = useNavigate()
    const { createExercise, getOneExercise, editExerciseId, updateExercise, exerciseTypes, getExerciseTypes } = useContext(ExerciseContext)
    
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentExercise, setCurrentExercise] = useState({
        exercise_type_id: "1",
        description: "",
        url: "",
        name: ""
    })

    
    useEffect(() => {
        getExerciseTypes()
        if (editExerciseId != 0) {
            getOneExercise(editExerciseId).then(exercise => {
                setCurrentExercise({
                name : exercise.name,
                exercise_type_id: exercise.exercise_type.id,
                description: exercise.description,
                url: exercise.url
            })
            
        })
        }
    }, [])


    const changeExerciseState = (event) => {
        const newExerciseState = { ...currentExercise }
        newExerciseState[`${event.target.name}`] = event.target.value
        setCurrentExercise(newExerciseState)
    }

    const submitExercise = evt => {
        // Prevent form from being submitted
        evt.preventDefault()

        const exercise = {...currentExercise}
        exercise.exercise_type_id = parseInt(currentExercise.exercise_type_id)

        if (editExerciseId === 0) {
            
            createExercise(exercise)
            .then(() => navigate("/exercises"))
        } else {
            
            updateExercise(exercise)
            .then(() => {
                navigate("/exercises")})
        }
        
    }


    return (
        <form className="exerciseForm">
            <h2 className="exerciseForm__title">{editExerciseId === 0
                                ? "Set New"
                                : "Edit"} Exercise</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="exercise_type_id">Exercise Type: </label>
                    <select type="text" name="exercise_type_id" required autoFocus className="form-control"
                        onChange={changeExerciseState} value={currentExercise.exercise_type_id}>
                            {
                                exerciseTypes.map(exerciseType => 
                                <option value={exerciseType.id} key= {exerciseType.id}>
                                    {exerciseType.name}
                                </option>)
                            }
                        </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentExercise.description}
                        onChange={changeExerciseState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="url">Url: </label>
                    <input type="text" name="url" required autoFocus className="form-control"
                        value={currentExercise.url}
                        onChange={changeExerciseState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentExercise.name}
                        onChange={changeExerciseState}
                    />
                </div>
            </fieldset>
            

            {editExerciseId === 0
                                ? <button className="btn btn-3"
                                    onClick={submitExercise}
                                    >Save New Exercise</button>
                                : <button className="btn btn-2"
                                    onClick={submitExercise}
                                    >Edit Exercise</button>}
        </form>
    )
}