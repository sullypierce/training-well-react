import React, { useContext, useEffect } from "react"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"

export const SessionExerciseList = (props) => {
    const { singleViewSession, singleSessionExercises }  = useContext(TrainingPlanContext)
    

    return (
        <article className="sessions">
        <h2>Sessions</h2>
        <button className="btn btn-2 btn-sep icon-create"
        //onClick={() => sendToExerciseForm(0)}
        >Add Exercise</button>
            <h3>{singleViewSession.assigned_date}</h3>
            <h3>{singleViewSession.notes}</h3>
            {
                singleSessionExercises.map(singleSessionExercise => {
                    return <section key={`singleSessionExercise--${singleSessionExercise.id}`} className="singleSessionExercise">

                        <div className="singleSessionExercise__date">Date: {singleSessionExercise.name}</div>
                        <div className="singleSessionExercise__notes">notes: {singleSessionExercise.notes}</div>
                        <div className="singleSessionExercise__notes">sets: {singleSessionExercise.sets}</div>
                        <div className="singleSessionExercise__notes">reps: {singleSessionExercise.reps}</div>
                        <div className="singleSessionExercise__notes">weight: {singleSessionExercise.weight_used}</div>

                        {/* <button className="btn btn-3"
                                    onClick={() => {sendTosingleSessionExerciseForm(singleSessionExercise.id)}}
                                    >Edit</button> */}
                    </section>
                })
            }
        </article>
    )
}