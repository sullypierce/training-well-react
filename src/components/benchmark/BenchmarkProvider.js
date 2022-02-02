import React, { useState } from "react"

export const BenchmarkContext = React.createContext()

export const BenchmarkProvider = (props) => {
    const [ benchmarks, setBenchmarks ] = useState([])
    const [editBenchmarkId, setEditId] = useState(0)

    const getBenchmarks = () => {
        return fetch("http://localhost:8000/benchmarks", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tw_token")}`
            }
        })
            .then(response => response.json())
            .then(setBenchmarks)
    }

    const getOneBenchmark = (id) => {
        return fetch(`http://localhost:8000/benchmarks/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tw_token")}`
            }
        })
            .then(response => response.json())
    }

    const createBenchmark = (benchmark) => {
        return fetch("http://localhost:8000/benchmarks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("tw_token")}`
            },
            body: JSON.stringify(benchmark)
         })
            .then(res => res.json())
    }

    const updateBenchmark = (benchmark) => {
        return fetch(`http://localhost:8000/Benchmarks/${editBenchmarkId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("tw_token")}`
            },
            body: JSON.stringify(benchmark)
         })
            .then(() => {
                setEditId(0)
            })
        }
    

    return (
        <BenchmarkContext.Provider value={{ benchmarks, getBenchmarks, createBenchmark, updateBenchmark, getOneBenchmark, editBenchmarkId, setEditId }} >
            { props.children }
        </BenchmarkContext.Provider>
    )
}