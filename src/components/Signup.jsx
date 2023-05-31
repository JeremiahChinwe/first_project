import React, { useState } from 'react'
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData
} from 'react-router-dom'
import { motion } from 'framer-motion'


export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}


export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    try {
        await createUserWithEmailAndPassword(auth, email, password)
        return redirect(pathname)

    } catch (err) {
        return err.message
    }
}




const Signup = ({ routeVariants }) => {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()
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
            className='sign_up_page'>
            <Form
                method='post'
                replace
                className='sign-up-form'
            >
                <h2 className='sign-up-h2'>Create an Account</h2>
                {message && <h3 className="text-red-500">{message}</h3>}
                {errorMessage && <h3 className="text-red-500">{errorMessage}</h3>}
                <div className="input-fields">
                    <div>
                        <label htmlFor="my_email">Email</label>
                        <input
                            type="email"
                            id="my_email"
                            name="email"
                            value={inputValue.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="my_password">Password</label>
                        <input
                            type="password"
                            id="phoneNum"
                            name="password"
                            value={inputValue.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            className="phoneNum"
                            autoComplete='off'
                            required
                        />
                        {inputValue.password && <p class="phoneFormat">Example:  JOHNdeo23$$</p>}
                    </div>
                </div>
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting" ? "Signing up..." : "Sign up"}
                </button>
            </Form>
        </motion.section>
    )
}

export default Signup