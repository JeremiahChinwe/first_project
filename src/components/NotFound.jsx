import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = ({ routeVariants }) => {
  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      exit={{ opacity: 0 }}
      className="not-found-page">
      <div className="content">
        <pre>404 Not found! 😞</pre>
        <span>The page you were looking for doesn't exist</span>
        <div>
          <Link to="." className='error-link'>Return to Home</Link>
        </div>
      </div>
    </motion.div>
  )
}

export default NotFound