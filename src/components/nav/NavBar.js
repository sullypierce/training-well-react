import {React, useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import { TrainingPlanContext } from "../trainingplan/TrainingPlanDataProvider"
import "./NavBar.css"
import logo from './trainingwell_logo.svg'

export const NavBar = () => {
    const {coachConnections} = useContext(TrainingPlanContext)
    const navigate = useNavigate()

    const linkClasses = 'nav-link basis-1/6'
    return (
        <ul className="navbar bg-transparent flex-wrap basis-1/5">
            <img className="logo" src={logo}/>
            <li className="navbar__header">
            <h1>TrainingWell</h1>
            </li>
            <li className="navbar__item">
            <Link className={linkClasses} to="/sessions">Training</Link>
            </li>
            <li className="navbar__item">
            <Link className={linkClasses} to="/exercises">Exercises</Link>
            </li>
            <li className="navbar__item">
            <Link className={linkClasses} to="/benchmarks">Benchmarks</Link>
            </li>
            {coachConnections.length == 0 ? 
            <li className="navbar__item">
                <Link className={linkClasses} to="/coachs">Find a Coach</Link>
            </li>
            : <></>
            }
            <li className="navbar__item">
            <Link className={linkClasses} to="/profile">Profile</Link>
            </li>
            <li className="navbar__item">
            <Link className={linkClasses} to="/charts">Data</Link>
            </li>
            {
                (localStorage.getItem("tw_token") !== null) ?
                <li className="navbar__item">
                            <Link className={linkClasses} to='/login' onClick={() => {
                                localStorage.clear()
                            }}>Logout</Link>
                        </li>
                            
                         :
                    <>
                        <li className="navbar__item">
                            <Link className={linkClasses} to="/login">Login</Link>
                        </li>
                        <li className="navbar__item">
                            <Link className={linkClasses} to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
