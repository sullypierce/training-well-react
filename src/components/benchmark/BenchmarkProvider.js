import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { data } from "../datamanager/DataManager"

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
        return data.get('benchmarks')
            .then(setBenchmarks)
    }

    const getOneBenchmark = (id) => {
        return data.getOne('benchmarks', id)
    }

    const createBenchmark = (benchmark) => {
        return data.post('benchmarks', benchmark)
    }

    const updateBenchmark = (benchmark) => {
        return data.update('benchmarks', editBenchmarkId, benchmark)
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