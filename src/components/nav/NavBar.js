import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__header">
            <h2>TrainingWell</h2>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/sessions">Training Sessions</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/exercises">Exercises</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/benchmarks">My Benchmarks</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/profile">My Profile</Link>
            </li>
            {
                (localStorage.getItem("tw_token") !== null) ?
                <li className="navbar__item">
                            <Link className="nav-link" to='/login' onClick={() => {
                                localStorage.removeItem("tw_token")
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
