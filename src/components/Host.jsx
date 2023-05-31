import React, { useContext } from 'react'
import { NavLink, Outlet } from "react-router-dom"
import { ThemeContext } from '../ThemeContext'
import { motion } from 'framer-motion'



const Host = ({ routeVariants }) => {
  const { isDarkMode } = useContext(ThemeContext)


  const styles = {
    color: isDarkMode ? "white" : "black",
    textDecoration: "underline"
  }


  return (
    <>
      <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      exit={{ opacity: 0 }}
        className={`${isDarkMode ? "bg-[#010116] text-white"
          : "bg-white text-black"} host`}
      >
        <ul className='host-nav'>
          <li>
            <NavLink
              to="."
              style={({ isActive }) => isActive ? styles : null}
              end
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="income"
              style={({ isActive }) => isActive ? styles : null}
            >
              Income
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
            <NavLink
              to="review"
              style={({ isActive }) => isActive ? styles : null}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </motion.div>
    </>
  )
}

export default Host