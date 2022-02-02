import React, { useContext, useEffect } from "react"
import { BenchmarkContext } from "./BenchmarkProvider.js"
import { useNavigate } from "react-router-dom"

export const BenchmarkList = (props) => {
    const { benchmarks, getBenchmarks, setEditId } = useContext(BenchmarkContext)

    useEffect(() => {
        getBenchmarks()
    }, [])

    const navigate = useNavigate()

    return (
        <article className="games">
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
            setEditId(0)
            navigate("/benchmarks/new" )
        }}
        >Set New Benchmark</button>
            {
                benchmarks.map(benchmark => {
                    return <section key={`benchmark--${benchmark.id}`} className="benchmark">

                        <div className="benchmark__exercisename">Exercise: {benchmark.exercise.name}</div>
                        <div className="benchmark__reps">Reps: {benchmark.reps}</div>
                        <div className="benchmark__weight">Weight {benchmark.weight}</div>
                        <div className="benchmark__notes">Notes: {benchmark.notes} </div>
                        <button className="btn btn-3"
                                    onClick={() => {
                                        setEditId(benchmark.id)
                                        navigate(`/benchmarks/${benchmark.id}/edit` )
                                    }}
                                    >Edit</button>
                    </section>
                })
            }
        </article>
    )
}