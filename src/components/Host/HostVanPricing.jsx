import React, { useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ThemeContext } from '../../ThemeContext'
import { motion } from 'framer-motion'

const HostVanPricing = ({ routeVariants }) => {
  const { currentVan } = useOutletContext()
  const { isDarkMode } = useContext(ThemeContext)


  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      exit={{ opacity: 0 }}
      className='HostVanPricing-page'>
      <p
        className={`${isDarkMode ? "text-white" : "text-black"} pricing`}
      >
        <span>${currentVan.price}</span>/day
      </p>
    </motion.div>
  )
}

export default HostVanPricing