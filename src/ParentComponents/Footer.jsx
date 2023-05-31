import React from 'react'

const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer>
      <div className='footer'>
        <p><span>&copy; {date}</span>  All Right Reserved</p>
        <p className='developer'>Developed by Jeremiah C.</p>
      </div>
    </footer>
  )
}

export default Footer