import React, { Suspense, useContext } from 'react'
import { getVans } from '../../firebase'
import { useLoaderData, Link, defer, useSearchParams, Await } from "react-router-dom"
import { ThemeContext } from '../../ThemeContext'
import { motion } from "framer-motion";


export function loader() {
  return defer({ vans: getVans() })
}


const Vans = ({ routeVariants }) => {
  const vansPromise = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type")
  const { isDarkMode } = useContext(ThemeContext)



  function handleFilteredVans(key, value) {
    setSearchParams(prevVans => {
      if (value === null) {
        prevVans.delete(key)
      } else {
        prevVans.set(key, value)
      }
      return prevVans
    })
  }



  function renderVansElement(vans) {
    const displayedVans = typeFilter ? vans.filter(van => van.type === typeFilter) : vans


    return (
      <motion.section
        id="van-page-container">
        <section
          className={`${isDarkMode ? "bg-[#010116] text-white"
            : "bg-white text-black"} van-page`}
        >
          <h1>Explore our van options</h1>
          <div className="buttons">
            <button
              onClick={() => handleFilteredVans("type", "simple")}
              className={`van-type simple ${typeFilter === "simple" ? "selected" : null}`}
            >
              Simple
            </button>
            <button
              onClick={() => handleFilteredVans("type", "luxury")}
              className={`van-type luxury ${typeFilter === "luxury" ? "selected" : null}`}
            >
              Luxury
            </button>
            <button
              onClick={() => handleFilteredVans("type", "rugged")}
              className={`van-type rugged ${typeFilter === "rugged" ? "selected" : null}`}
            >
              Rugged
            </button>
            {typeFilter ? (
              <button
                onClick={() => handleFilteredVans("type", null)}
                className='clear-button'
              >
                Clear filter
              </button>
            ) : null}
          </div>
        </section>

        <section className="van-page-container">
          <div className="container">
            {displayedVans.map(van => (
              <Link
                to={van.id}
                key={van.id}
                state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
              >
                <div className="inner-container">
                  <img src={van.imageUrl} alt="vans" className='van-image' />
                  <div>
                    <h2>{van.name}</h2>
                    <p>${van.price}/day</p>
                    <i className={`van-type ${van.type} selected `}>{van.type}</i>
                  </div>
                </div>
              </Link>
            ))
            }
          </div>
        </section>
      </motion.section>
    )

  }



  return (
    <motion.section
      variants={routeVariants}
      initial="initial"
      animate="final"
      exit={{ opacity: 0 }}
    >
      <Suspense fallback={<h1 className={` ${isDarkMode ? "text-white" : "text-black"} suspense`}>Loading vans...</h1>}>
        <Await resolve={vansPromise.vans}>
          {renderVansElement}
        </Await>
      </Suspense>
    </motion.section>

  )
}

export default Vans