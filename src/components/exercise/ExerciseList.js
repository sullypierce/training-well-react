import React, { useContext, useEffect } from "react"
import { ExerciseContext } from "./ExerciseProvider.js"

export const ExerciseList = (props) => {
    const { exercises, getExercises, editExerciseId, sendToExerciseForm } = useContext(ExerciseContext)

    useEffect(() => {
        getExercises()
    }, [])


    

    return (
        <article className="games">
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => sendToExerciseForm(0)}
        >Add New Exercise</button>
            {
                exercises.map(exercise => {
                    return <section key={`exercise--${exercise.id}`} className="Exercise">

                        <div className="exercise__exercisename">Exercise: {exercise.name}</div>
                        <div className="exercise__description">Description: {exercise.description}</div>
                        <div className="exercise__url">Url: {exercise.url}</div>
                        <button className="btn btn-3"
                                    onClick={() => {sendToExerciseForm(exercise.id)}}
                                    >Edit</button>
                    </section>
                })
            }
        </article>
    )
}