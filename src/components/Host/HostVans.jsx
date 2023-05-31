import React, { Suspense, useContext } from 'react'
import { Link, useLoaderData, defer, Await } from 'react-router-dom'
import { getHostVans } from '../../firebase'
import { ThemeContext } from "../../ThemeContext"
import { motion } from 'framer-motion'


export function loader() {
  return defer({ vans: getHostVans() })
}


export default function HostVans({ routeVariants }) {
  const vansPromise = useLoaderData()
  const { isDarkMode } = useContext(ThemeContext)

  function renderVanElements(vans) {
    const vansElements = vans.map(van => (
      <Link
        to={van.id}
        key={van.id}
        className='host-van-link'
      >
        <div className="details">
          <div className="details-van-info">
            <div>
              <img src={van.imageUrl} alt="vans" />
            </div>

            <div>
              <h1>{van.name}</h1>
              <p><span>${van.price}</span>/day</p>
            </div>
            
          </div>
          <div>
            <i className={`hidden md:block van-type ${van.type} selected`}>{van.type}</i>
          </div>
        </div>
      </Link>
    ))
    return (
      <div 
      className={`${isDarkMode ? "bg-[#010116] text-white" : 
      "bg-[#fcf9f9] text-black"} host-van-list`}>
        <h1 className='host-van-title'>Your listed vans</h1>
        <section>
          {vansElements}
        </section>
      </div>
    )
  }

  return (
    <motion.section
    variants={routeVariants}
      initial="initial"
      animate="final"
      exit={{ opacity: 0 }} 
    className='host-van-container'>
      <Suspense fallback={<h1 className='suspense'>Loading vans...</h1>}>
        <Await resolve={vansPromise.vans}>
          {renderVanElements}
        </Await>
      </Suspense>
    </motion.section>
  )


}