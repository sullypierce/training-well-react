import React from "react"
import { Route, Navigate, Routes, useNavigate } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
// import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { BenchmarkProvider } from "./benchmark/BenchmarkProvider"
import { ExerciseProvider } from "./exercise/ExerciseProvider"

export const TrainingWell = () => {
    let navigate = useNavigate();

    const SignInWrapper = () => {
        return localStorage.getItem('tw_token') ? <ApplicationViews/> : <Navigate to="/login" replace />;
      };
    
    return <>
    <BenchmarkProvider>
    <ExerciseProvider>
    <Routes>
        
        <Route path='*' element={<SignInWrapper/>} />
                     
            

        <Route path="/login" element={<Login />}/>

        <Route path="/register" element={<Register />}/>
            
    </Routes>
    </ExerciseProvider>
    </BenchmarkProvider>
    </>
}