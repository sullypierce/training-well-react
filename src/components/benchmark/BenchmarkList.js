import React, { useContext, useEffect } from "react"
import { BenchmarkContext } from "./BenchmarkProvider.js"
import { useNavigate } from "react-router-dom"

export const BenchmarkList = (props) => {
    const { benchmarks, getBenchmarks, editBenchmarkId, sendToForm } = useContext(BenchmarkContext)

    useEffect(() => {
        getBenchmarks()
    }, [])


    

    return (
        <article className="games">
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => sendToForm("0")}
        >Set New Benchmark</button>
            {
                benchmarks.map(benchmark => {
                    return <section key={`benchmark--${benchmark.id}`} className="benchmark">

                        <div className="benchmark__exercisename">Exercise: {benchmark.exercise.name}</div>
                        <div className="benchmark__reps">Reps: {benchmark.reps}</div>
                        <div className="benchmark__weight">Weight {benchmark.weight}</div>
                        <div className="benchmark__notes">Notes: {benchmark.notes} </div>
                        <div className="benchmark__date">Date Set: {benchmark.date} </div>
                        <button className="btn btn-3"
                                    onClick={() => {sendToForm(benchmark.id)}}
                                    >Edit</button>
                    </section>
                })
            }
        </article>
    )
}