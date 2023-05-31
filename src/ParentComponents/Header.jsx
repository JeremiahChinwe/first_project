import React, { useState, useContext } from 'react'
import { NavLink, Link } from "react-router-dom"
import { ThemeContext } from '../ThemeContext'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../firebase'


const Header = () => {
    const [user] = useAuthState(auth)
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)
    const [isPacked, setIsPacked] = useState(false)
    


    const signOut = () => {
        auth.signOut()
    }

    const toggleMenu = () => {
        const buttunEl = document.getElementById("menu-button")
        buttunEl.classList.toggle("show")
    }

    const styles = {
        textDecoration: "underline"
    }

    const hostStyles = {
        color: "#cecccc"
    }



    return (
        <div className="before_header">
            <header className={`header ${isDarkMode ? "dark-theme" : ""}`}>
                <NavLink to="." className="header-title">Vanlife</NavLink>

                {/* Menu */}
                <ul className="header-nav">
                    <li>
                        <NavLink
                            to={`${user ? 'host' : '/login'}`}
                            style={({ isActive }) => isActive ? styles : null}
                        >
                            Host
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="about"
                            style={({ isActive }) => isActive ? styles : null}
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="vans"
                            style={({ isActive }) => isActive ? styles : null}
                        >
                            Vans
                        </NavLink>
                    </li>
                    <li>
                        <div className="theme-toggler" onClick={toggleTheme}>
                            <span className="material-icons-sharp active">light_mode</span>
                            <span className="material-icons-sharp">dark_mode</span>
                        </div>
                    </li>
                    {user ?
                        (<Link
                            className='bg-blue-900 text-white px-2 py-[0.25rem] rounded-md text-sm'
                            to="login"
                            onClick={signOut}
                        >
                            Sign out
                        </Link>
                        ) : (
                            <Link
                                className='bg-blue-900 text-white px-2 py-[0.25rem] rounded-md text-sm'
                                to="login"
                            >
                                Sign in
                            </Link>
                        )
                    }
                </ul>

                {/* Harmburger Menu */}
                <div onClick={toggleMenu}>
                    <button id='menu-button' onClick={handleClick}>
                        <div className="menu-icon"></div>
                    </button>
                </div>
            </header>


            {/* ---------- Mobile Menu ------------- */}
            <ul
                className={`${nav ? "hide-nav" : "mobile-nav"} ${isDarkMode ? "dark-theme" : ""} before_header_mobile`}>

                <li
                    onClick={() => setIsPacked(!isPacked)}
                    className='mobile-nav-host'
                >
                    Host
                    <span
                        className={`material-icons-sharp ${isPacked ? "rotate-35"
                            : "-rotate-90"} duration-300`}
                    >
                        expand_more
                    </span>
                </li>
                {isPacked &&
                    <ul className='mobile-nav-children'>
                        <li onClick={toggleMenu}>
                            <NavLink
                                to={`${user ? "/host" : "/login"}`}
                                end
                                style={({ isActive }) => isActive ? hostStyles : null}
                                onClick={handleClick}
                            >
                                <span className="material-icons-sharp">grid_view</span>
                                Dashboard
                            </NavLink>
                        </li>
                        <li onClick={toggleMenu}>
                            <NavLink
                                to={`${user ? "/host/income" : "/login"}`}
                                style={({ isActive }) => isActive ? hostStyles : null}
                                onClick={handleClick}
                            >
                                <span className="material-icons-sharp">shopping_cart</span>
                                Income
                            </NavLink>
                        </li>
                        <li onClick={toggleMenu}>
                            <NavLink
                                to={`${user ? '/host/vans' : "/login"}`}
                                style={({ isActive }) => isActive ? hostStyles : null}
                                onClick={handleClick}
                            >
                                <span className="material-icons-sharp">airport_shuttle</span>
                                Vans
                            </NavLink>
                        </li>
                        <li onClick={toggleMenu}>
                            <NavLink
                                to={`${user ? '/host/review' : '/login'}`}
                                style={({ isActive }) => isActive ? hostStyles : null}
                                onClick={handleClick}
                            >
                                <span className="material-icons-sharp">group</span>
                                Reviews
                            </NavLink>
                        </li>
                    </ul>
                }


                {/* to={`${user ? 'host' : '/login?message=You must log in first.&redirectTo'}`}
                        style={({ isActive }) => isActive ? styles : null}
                        onClick={handleClick} */}


                <li onClick={toggleMenu}>
                    <NavLink
                        to="about"
                        style={({ isActive }) => isActive ? styles : null}
                        onClick={handleClick}
                    >
                        About
                    </NavLink>
                </li>
                <li onClick={toggleMenu}>
                    <NavLink
                        to="vans"
                        style={({ isActive }) => isActive ? styles : null}
                        onClick={handleClick}
                    >
                        Vans
                    </NavLink>
                </li>
                <li onClick={toggleMenu}>
                    <div onClick={handleClick}>
                        {user ?
                            (<Link
                                className='bg-gray-900 text-white px-2 py-[0.25rem] rounded-md text-sm'
                                to="login"
                                onClick={signOut}
                            >
                                Sign out
                            </Link>
                            ) : (
                                <Link
                                    className='bg-gray-900 text-white px-2 py-[0.25rem] rounded-md text-sm'
                                    to="login"
                                >
                                    Sign in
                                </Link>
                            )
                        }
                    </div>
                </li>

                <li>
                    <div className="theme-toggler" onClick={toggleTheme}>
                        <span className="material-icons-sharp active">light_mode</span>
                        <span className="material-icons-sharp">dark_mode</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Header


