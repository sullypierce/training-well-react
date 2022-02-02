import React from "react"
import { Route, Routes} from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { BenchmarkList } from "./benchmark/BenchmarkList"
import { BenchmarkProvider } from "./benchmark/BenchmarkProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <NavBar/>
            <h1>TrainingWell</h1>
            <BenchmarkProvider>
            <Routes>
            <Route path="/welcome" element={<>
                <h2>Welcome!</h2></>}/>
            <Route path='training' element={<h2>Training</h2>}/>
            
                <Route path='benchmarks' element={<BenchmarkList/>}/>
            
            
            </Routes>
            </BenchmarkProvider>
        </main>
    </>
}