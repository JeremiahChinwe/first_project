import React from 'react'
import {Link } from "react-router-dom"
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()

  return (
    <div className='error-page'>
        <pre>Error occured: {error.message}</pre>
        <pre>Check your internet connection and try again</pre>
        <Link to="." className='error-link'>Return to Home</Link>
    </div>
  )
}

export default Error