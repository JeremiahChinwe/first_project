import React, { useContext } from 'react';
import incomeImg from '../../assets/income-graph.png'
import { ThemeContext } from "../../ThemeContext"
import { motion } from 'framer-motion';

const Income = ({ routeVariants }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const transactions = [
    { price: 720, date: "Jan 3,'23" },
    { price: 560, date: "Dec 12,'22" },
    { price: 980, date: "Dec 3,'22" }
  ]
  return (
    <motion.section 
    variants={routeVariants}
    initial="initial"
    animate="final"
    exit={{ opacity: 0 }}
    className={` ${isDarkMode ? "bg-[#010116] text-white" : "bg-[#fcf9f9] text-black"} income-container`}>
      <div className="income-container-child">

        <div className={` ${isDarkMode ? "text-white" : "text-black"} income`}>
          <div className={` ${isDarkMode ? "text-white" : "text-black"} income-info`}>
            <div className='income-info-h1-p'>
              <h1 className={`${isDarkMode ? "text-white" : "text-black"}`}>Income</h1>
              <p className={` ${isDarkMode ? "text-white" : "text-black"} days`}>Last <span>30days</span></p>
            </div>
            <div>
              <p
                className={` ${isDarkMode ? "text-white"
                  : "text-black"} price`}
              >
                $2,260
              </p>
            </div>
          </div>
          <img src={incomeImg} alt="income graph" />
        </div>

        <div className="income-list">
          <div className="income-list-title">
            <h2>Your transactions (3)</h2>
            <div>
              <p className={` ${isDarkMode ? "text-white" : "text-black"} days`}>Last <span>30days</span></p>
            </div>

          </div>

          {transactions.map(transaction => (
            <div key={transaction.price} className='transaction-container'>
              <div className="box">
                  <h1>${transaction.price}</h1>
                  <span>{transaction.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.section>
  )
}

export default Income