import React from "react"
import { Route, Routes} from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { BenchmarkList } from "./benchmark/BenchmarkList"
import { BenchmarkForm } from "./benchmark/BenchmarkForm"
import { ExerciseList } from "./exercise/ExerciseList"
import { ExerciseForm } from "./exercise/ExerciseForm"
import { SessionList } from "./sessions/SessionList"
import { SessionExerciseList } from "./sessions/SessionExerciseList"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <NavBar/>
            
                    <Routes>
                        <Route path="/welcome" element={<>
                            <h2>Welcome!</h2></>}/>
                        <Route path='training' element={<h2>Training</h2>}/>
                    
                        <Route exact path='benchmarks' element={<BenchmarkList/>}/>
                        <Route exact path='benchmarks/form' element={<BenchmarkForm/>} />

                        <Route exact path='exercises' element={<ExerciseList/>}/>
                        <Route exact path='exercises/form' element={<ExerciseForm/>}/>
                        
                        <Route exact path='sessions' element={<SessionList/>}/>
                        <Route exact path='session/details' element={<SessionExerciseList />}/>
                    </Routes>
                
        </main>
    </>
}