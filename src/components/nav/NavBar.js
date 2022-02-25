import {React, useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"
import "./NavBar.css"
import logo from './trainingwell_logo.svg'

export const NavBar = () => {
    const {coachConnections} = useContext(TrainingPlanContext)
    const navigate = useNavigate()
    return (
        <ul className="navbar bg-transparent">
            <img className="logo" src={logo}/>
            <li className="navbar__header">
            <h2>TrainingWell</h2>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/sessions">Training</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/exercises">Exercises</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/benchmarks">Benchmarks</Link>
            </li>
            {coachConnections.length == 0 ? 
            <li className="navbar__item">
                <Link className="nav-link" to="/coachs">Find a Coach</Link>
            </li>
            : <></>
            }
            <li className="navbar__item">
            <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            {
                (localStorage.getItem("tw_token") !== null) ?
                <li className="navbar__item">
                            <Link className="nav-link" to='/login' onClick={() => {
                                localStorage.clear()
                            }}>Logout</Link>
                        </li>
                            
                         :
                    <>
                        <li className="navbar__item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
