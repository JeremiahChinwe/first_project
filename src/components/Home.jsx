import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = ({ routeVariants }) => {
  return (
    <motion.section 
    variants={routeVariants}
      initial="initial"
      animate="final"
      exit={{ opacity: 0 }}
    className="home-container">
      <div className="home-img">
        <h1>You got the travel plans, we got the travel vans.</h1>
        <p>Add adventure to your life by joining the vanlife movement. Rent the perfect van to make your perfect road trip.</p>

      <Link to="vans" className="find-vans">Find your van</Link>
    </div>
    </motion.section>
    
  )
}

export default Home