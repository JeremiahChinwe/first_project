import React, { useContext } from 'react'
import { getVan } from '../../firebase'
import { useLoaderData, useLocation, Link } from 'react-router-dom'
import { ThemeContext } from "../../ThemeContext"
import { motion } from 'framer-motion'


export function loader({ params }) {
  return getVan(params.id)
}

export default function VanDetail({ routeVariants }) {
  const van = useLoaderData()
  const location = useLocation()
  const { isDarkMode } = useContext(ThemeContext)


  const search = location.state?.search || ""
  const type = location.state?.type || "all"


  return (
    <>
      <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      exit={{ opacity: 0 }}
        className={` ${isDarkMode ? "bg-[#010116] text-white" :
          "bg-white text-black"} vandetail-page`}
      >
         <Link
        to={`..${search}`}
        relative='path'
        className='vandetail-back-button'
      >
        &larr; <span>Back to {type[0].toUpperCase() + type.slice(1)} vans</span>
      </Link>
        <div className="van-detail">
          <section className="van-detail-img-des">
            <img src={van.imageUrl} alt="van" className='van-image' />
            <p
              className={`${isDarkMode ? "text-white"
                : "text-black"} van-info-des`}
            >
              {van.description}
            </p>
          </section>

          <div className="van-info">
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            <h1>{van.name}</h1>
            <p
              className={`${isDarkMode ? "text-white"
                : "text-black"} price`}
            >
              <span>${van.price}</span>/day</p>
          </div>
        </div>
        <Link to="/host/vans" className='rent-van'>Rent Van</Link>
      </motion.div>
      
    </>
  )
}