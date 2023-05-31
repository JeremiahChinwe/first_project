import React, { useContext } from 'react'
import { Link, defer, Await, useLoaderData } from 'react-router-dom'
import { BsStarFill } from "react-icons/bs"
import { getHostVans } from "../../firebase"
import { ThemeContext } from '../../ThemeContext'
import { motion } from "framer-motion"


export async function loader() {
  return defer({ vans: getHostVans() })
}

const Dashboard = ({ routeVariants }) => {
  const loaderData = useLoaderData()
  const { isDarkMode } = useContext(ThemeContext)

  function renderVanElements(vans) {
    const vansElements = vans.map(van => (
      <div
        key={van.id}
        className='host-div'
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
            <Link to={`/host/vans/${van.id}`}>View</Link>
          </div>
        </div>
      </div>
    ))
    return (
      <div className={` ${isDarkMode ? "bg-[#010116] text-white" : "bg-[#fcf9f9] text-black"} host-van-list`}>
        <section>
          {vansElements}
        </section>
      </div>
    )
  }



  return (
    <>
      <motion.section
        variants={routeVariants}
        initial="initial"
        animate="final"
        exit={{ opacity: 0 }}
        className={` ${isDarkMode ? "bg-[#010116] text-white" : "bg-[#fcf9f9] text-black"} dashboard`}>
        <div className="dashboard-child">
          <div className='dashboard-earnings'>
            <div className='info'>
              <h1>Dashboard</h1>
              <span>Income last <span className='days'>30 days</span></span>
              <p className={` ${isDarkMode ? "text-white" : "text-black"} price`}>$2,269</p>
            </div>
            <div class="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div class="number">
                <p>81%</p>
              </div>
            </div>
            <nav aria-label='dashboard-label'>
              <ul>
                <li>
                  <Link to="income">View Details</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className='first-review'>
            <div className='first-review-info'>
              <h1>Review Score</h1>
              <div>
                <BsStarFill className="star" />
                <p className={` ${isDarkMode ? "text-white" : "text-black"}`}><span>5.0</span>/5</p>
              </div>

            </div>
            <nav aria-label='review-label'>
              <ul>
                <li>
                  <Link to="review">View Details</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="listed-vans-title">
            <h1>Your listed vans</h1>
            <nav>
              <ul>
                <li>
                  <Link to="vans">View All</Link>
                </li>
              </ul>
            </nav>
          </div>
          <section 
          className={` ${isDarkMode ? "bg-[#010116] text-white" : "bg-[#fcf9f9] text-black"} dashboard-vans`}>
            <React.Suspense fallback={<h1 className='suspense'>Loading...</h1>}>
              <Await resolve={loaderData.vans}>{renderVanElements}</Await>
            </React.Suspense>
          </section>
        </div>
      </motion.section>
    </>
  )
}

export default Dashboard