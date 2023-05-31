import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'

const HostVanPhotos = ({ routeVariants }) => {
  const { currentVan } = useOutletContext()


  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      exit={{ opacity: 0 }}
      className='hostVanPhotos-page'>
      <img src={currentVan.imageUrl} alt="van" className='photos' />
    </motion.div>
  )
}

export default HostVanPhotos