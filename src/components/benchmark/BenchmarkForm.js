import React, { useContext, useState, useEffect } from "react"
import { BenchmarkContext } from "./BenchmarkProvider.js"
import { ExerciseContext } from "../exercise/ExerciseProvider.js"
import { useNavigate } from 'react-router-dom'


export const BenchmarkForm = () => {
    const navigate = useNavigate()
    const { createBenchmark, getOneBenchmark, editBenchmarkId, updateBenchmark } = useContext(BenchmarkContext)
    const {exercises, getExercises} =useContext(ExerciseContext)
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentBenchmark, setCurrentBenchmark] = useState({
        notes: "",
        exercise_id: "1",
        reps: "",
        weight: "",
        date: "1994-08-10"
    })

    /*
        Get Benchmark types on initialization so that the <select>
        element presents Benchmark type choices to the user.
    */
    useEffect(() => {
        getExercises()
        console.log(editBenchmarkId)
        if (editBenchmarkId != 0) {
            getOneBenchmark(editBenchmarkId).then(benchmark => {
                setCurrentBenchmark({
                notes : benchmark.notes,
                exercise_id: benchmark.exercise.id,
                reps: benchmark.reps,
                weight: benchmark.weight,
                date: benchmark.date
            })
            
        })
        }
    }, [])


    const changeBenchmarkState = (event) => {
        const newBenchmarkState = { ...currentBenchmark }
        newBenchmarkState[`${event.target.name}`] = event.target.value
        setCurrentBenchmark(newBenchmarkState)
    }

    const submitBenchmark = evt => {
        // Prevent form from being submitted
        evt.preventDefault()

        const benchmark = {...currentBenchmark}
        benchmark.exercise_id = parseInt(currentBenchmark.exercise_id)

        if (editBenchmarkId === 0) {
            
            createBenchmark(benchmark)
            .then(() => navigate("/benchmarks"))
        } else {
            
            updateBenchmark(benchmark)
            .then(() => {
                navigate("/benchmarks")})
        }
        // Send POST request to your API
        
    }


    return (
        <form className="BenchmarkForm">
            <h2 className="BenchmarkForm__title">{editBenchmarkId === 0
                                ? "Set New"
                                : "Edit"} Benchmark</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="exercise_id">Exercise: </label>
                    <select type="text" name="exercise_id" required autoFocus className="form-control"
                        onChange={changeBenchmarkState} value={currentBenchmark.exercise_id}>
                            {
                                exercises.map(exercise => 
                                <option value={exercise.id} key= {exercise.id}>
                                    {exercise.name}
                                </option>)
                            }
                        </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reps">Reps: </label>
                    <input type="text" name="reps" required autoFocus className="form-control"
                        value={currentBenchmark.reps}
                        onChange={changeBenchmarkState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="weight">Weight Used: </label>
                    <input type="text" name="weight" required autoFocus className="form-control"
                        value={currentBenchmark.weight}
                        onChange={changeBenchmarkState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes: </label>
                    <input type="text" name="notes" required autoFocus className="form-control"
                        value={currentBenchmark.notes}
                        onChange={changeBenchmarkState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date Set: </label>
                    <input type="date" name="date" className="form-control"
                        value={ currentBenchmark.date }
                        onChange={ changeBenchmarkState }>
                        
                    </input>
                </div>
            </fieldset>
            

            {editBenchmarkId === 0
                                ? <button className="btn btn-3"
                                    onClick={submitBenchmark}
                                    >Save New Benchmark</button>
                                : <button className="btn btn-2"
                                    onClick={submitBenchmark}
                                    >Edit Benchmark</button>}
        </form>
    )
}