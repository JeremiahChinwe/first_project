import React, { useContext } from 'react'
import { BsStarFill } from "react-icons/bs"
import graph from "../../assets/reviews-graph.png"
import { ThemeContext } from "../../ThemeContext"
import { motion } from 'framer-motion'




const Review = ({ routeVariants }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const reviewsData = [
    {
      rating: <BsStarFill className='star' />,
      name: "Elliot",
      date: "January 3, 2023",
      text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
      id: "1",
    },
    {
      rating: <BsStarFill className="star" />,
      name: "Sandy",
      date: "December 12, 2022",
      text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
      id: "2",
    },
  ]
  return (
    <motion.div 
    variants={routeVariants}
    initial="initial"
    animate="final"
    exit={{ opacity: 0 }}
    className='review-parent-container'>
      <div
        className={` ${isDarkMode ? "bg-[#010116] text-white" :
          "bg-[#fcf9f9] text-black"} review-page`}
      >
        <div className='review-title'>
          <h1>Your reviews</h1>
          <div>
            <p
              className={`${isDarkMode ? "text-white" : "text-black"}`}
            >
              Last<span>30 days</span>
            </p>
          </div>

        </div>
        <img src={graph} alt="review" />
      </div>

      <section className="review-rating-container">
        <div
          className={` ${isDarkMode ? "bg-[#010116] text-white" :
            "bg-[#ebe8e8] text-black"} review-rating`}
        >
          <h1>Reviews (2)</h1>

          {reviewsData.map(data => (
            <div className='review-data'>
              <div className="rating-icon">
                <p>{data.rating}</p>
                <p>{data.rating}</p>
                <p>{data.rating}</p>
                <p>{data.rating}</p>
                <p>{data.rating}</p>
              </div>

              <div
                className='review-data-info'
              >
                <p
                  className={` ${isDarkMode ? "text-white" : "text-black"} name-date`}
                >
                  {data.name} <span>{data.date}</span>
                </p>
                <p
                  className={` ${isDarkMode ? "text-white" : "text-black"} review-data-info-text`}
                >
                  {data.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}

export default Review