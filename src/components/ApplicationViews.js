import React from "react"
import { Route, Routes} from "react-router-dom"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Routes>
            <Route path="/" element={<><h1>TrainingWell</h1>
                <h2>Welcome!</h2></>}/>
                </Routes>
        </main>
    </>
}