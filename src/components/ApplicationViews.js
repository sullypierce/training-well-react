import React from "react"
import { Route, Routes} from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { BenchmarkList } from "./benchmark/BenchmarkList"
import { BenchmarkProvider } from "./benchmark/BenchmarkProvider"
import { ExerciseProvider } from "./exercise/ExerciseProvider"
import { BenchmarkForm } from "./benchmark/BenchmarkForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <NavBar/>
            <ExerciseProvider>
                <BenchmarkProvider>
                    <Routes>
                        <Route path="/welcome" element={<>
                            <h2>Welcome!</h2></>}/>
                        <Route path='training' element={<h2>Training</h2>}/>
                    
                        <Route exact path='benchmarks' element={<BenchmarkList/>}/>
                        <Route exact path='benchmarks/form' element={<BenchmarkForm/>} />
                    
                    
                    </Routes>
                </BenchmarkProvider>
            </ExerciseProvider>
        </main>
    </>
}