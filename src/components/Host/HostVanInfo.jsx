import React, { useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ThemeContext } from '../../ThemeContext'
import { motion } from 'framer-motion'


const HostVanInfo = ({ routeVariants }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const { currentVan } = useOutletContext()
  console.log(currentVan)


  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      exit={{ opacity: 0 }}
      className='host-van-info-page'>
      <p className={`${isDarkMode ? "text-white" : "text-black"}`}
      >
        <span>Name:</span> {currentVan.name}
      </p>
      <p className={`${isDarkMode ? "text-white" : "text-black"}`}
      >
        <span>Category:</span> {currentVan.type[0].toUpperCase() + currentVan.type.slice(1)}
      </p>
      <p className={`${isDarkMode ? "text-white" : "text-black"}`}
      >
        <span>Description:</span> {currentVan.description}
      </p>
      <p className={`${isDarkMode ? "text-white" : "text-black"}`}
      >
        <span>Visibility:</span> Public
      </p>
    </motion.div>
  )
}

export default HostVanInfo