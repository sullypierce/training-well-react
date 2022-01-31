import React from "react"
import { Route, Routes} from "react-router-dom"
import { NavBar } from "./nav/NavBar"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <NavBar/>
            <h1>TrainingWell</h1>
            <Routes>
            <Route path="/welcome" element={<>
                <h2>Welcome!</h2></>}/>
            <Route path='training' element={<h2>Training</h2>}/>
            
            </Routes>

        </main>
    </>
}