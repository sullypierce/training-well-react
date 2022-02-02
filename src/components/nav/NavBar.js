import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
            <Link className="nav-link" to="/welcome">Welcome</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/training">Training</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/benchmarks">Benchmarks</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/profile">My Profile</Link>
            </li>
            {
                (localStorage.getItem("tw_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("tw_token")
                                navigate('/')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
