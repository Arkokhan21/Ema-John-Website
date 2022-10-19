import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/Usercontext';
import './Signup.css'

const Signup = () => {

    const { createUser } = useContext(AuthContext)

    const [error, setError] = useState(null)

    const handleSignUp = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        const confirmPassword = form.confirmPassword.value

        if (password.length < 6) {
            setError('password should be 6 characters or more')
        }

        else if (password !== confirmPassword) {
            setError('password didnt match. please provide agian')
        }

        createUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                form.reset()
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" required />
                </div>
                <p className='text-error'>{error}</p>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p>Already have an account? <Link to='/login'> Login</Link></p>
        </div>
    );
};

export default Signup;