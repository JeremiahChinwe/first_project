import React, { useContext, useState } from 'react';
import aboutImg from "../assets/about-hero.png"
import { Link } from "react-router-dom"
import greenVan from "../assets/green-van.png"
import { ThemeContext } from '../ThemeContext';
import { motion } from 'framer-motion';

const About = ({ routeVariants }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const [open, setOpen] = useState(true)
  const hello = "Hello"


  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      exit={{ opacity: 0 }}
      className='about-page'
    >
      <div className="about-page-child">
        <img src={aboutImg} alt="about page" />
        <div className="about-page-hero">
          <section className='hero'>
            <div className='info'>
              <h1
                className={` ${isDarkMode ? "text-white"
                  : "text-[#06065f]"} `}
              >
                Don’t squeeze in a sedan when you could relax in a van.
              </h1>
              <p
                className={`${isDarkMode ? "text-white"
                  : "text-black"}`}
              >
                Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)
              </p>
              <p
                className={`${isDarkMode ? "text-white"
                  : "text-black"}`}
              >
                Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.
              </p>
            </div>
            <img src={greenVan} alt="green van" className='green-van' />
          </section>
        </div>
        <div className="desc">
          <div>
            <p>Your destination is waiting.</p>
            <p>Your van is ready.</p>
          </div>
          <Link to="/vans">Explore our vans</Link>
        </div>
      </div>
    </motion.div>
  )
}

export default About