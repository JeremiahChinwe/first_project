import React, { useContext, useState } from 'react'
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Link } from 'react-router-dom';
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData
} from 'react-router-dom'
import { ThemeContext } from '../ThemeContext';
import { motion } from 'framer-motion';


export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}


export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    try {
        await signInWithEmailAndPassword(auth, email, password)
        return redirect(pathname)

    } catch (err) {
        return err.message
    }
}


export default function Login({ routeVariants }) {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()
    const { isDarkMode } = useContext(ThemeContext)
    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target
        setInputValue(prevValue => ({
            ...prevValue,
            [name]: type === "checkbox" ? checked : value
        }))
    }


    return (
        <motion.section
            variants={routeVariants}
            initial="initial"
            animate="final"
            exit={{ opacity: 0 }}
            className='sign_in_page'
        >
            <Form
                method='post'
                className='login-form'
                replace
            >
                <h1 className={`${isDarkMode ? "text-white" : "text-black"}`}>Continue with email</h1>
                {message && <h3 className="text-red-500 flex justify-center mx-auto">{message}</h3>}
                {errorMessage && <h3 className="text-red-500">{errorMessage}</h3>}
                <div className="input-fields">
                    <div>
                        <label htmlFor="emial">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={inputValue.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={inputValue.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                </div>
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting" ? "Logging in..." : "Log in"}
                </button>
                <div className={` ${isDarkMode ? "text-white" : "text-black"} new-user`}>
                    <p className={` ${isDarkMode ? "text-white" : "text-black"} `}>New to Vanlife? <Link to="/signup">Sign up</Link></p>
                </div>
            </Form>
        </motion.section>
    )
}
