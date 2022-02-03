import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const BenchmarkContext = React.createContext()

export const BenchmarkProvider = (props) => {
    const [ benchmarks, setBenchmarks ] = useState([])
    const [editBenchmarkId, setEditBenchmarkId] = useState(0)
    const navigate = useNavigate()

    const sendToForm = (id) => {
        setEditBenchmarkId(id)
        navigate("/benchmarks/form")
    }

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
                setEditBenchmarkId(0)
            })
        }
    

    return (
        <BenchmarkContext.Provider value={{ benchmarks, getBenchmarks, createBenchmark, updateBenchmark, getOneBenchmark, editBenchmarkId, sendToForm }} >
            { props.children }
        </BenchmarkContext.Provider>
    )
}