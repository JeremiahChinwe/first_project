import React, { useContext } from 'react'
import { getVan } from '../../firebase'
import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom"
import { ThemeContext } from '../../ThemeContext'


export async function loader({ params }) {
  return getVan(params.id)
}

const HostVanDetail = () => {
  const { isDarkMode } = useContext(ThemeContext)
  const currentVan = useLoaderData()

  const styles = {
    color: isDarkMode ? "white" : "black",
    textDecoration: "underline"
  }


  return (
    <>

      <section
        className={` ${isDarkMode ? "bg-[#010116] text-white"
          : "bg-[#fcf9f9] text-black"} host-van-detail-page`}
      >
        <Link to=".." relative='path' className='host-van-detail-back-button'>&larr; Back to all vans</Link>
        <div className='host-van-detail-container'>
          <img src={currentVan.imageUrl} alt="vans" />
          <div className='host-van-detail-info'>
            <i
              className={`van-type ${currentVan.type} selected`}
            >
              {currentVan.type}
            </i>
            <h1>{currentVan.name}</h1>
            <p
            className={`${ isDarkMode ? "text-white" : "text-black"}`}
            >
              <span>${currentVan.price}</span>/day
              </p>
          </div>
        </div>
        <nav className='host-van-detail-nav' aria-label='host vans'>
          <NavLink
            to="."
            end
            style={({ isActive }) => isActive ? styles : null}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => isActive ? styles : null}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => isActive ? styles : null}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </section>
    </>
  )
}

export default HostVanDetail