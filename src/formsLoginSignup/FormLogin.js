import React, { useState, useEffect } from 'react';
import './Form2.css';
import FormSuccess from './FormSuccess';
import validate from './validateInfo';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import { useHistory } from 'react-router-dom';

export default function FormLogin() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, userType } = userSignin;
    const dispatch = useDispatch();
    const history = useHistory();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    useEffect(() => {
        if (userInfo) {
            history.push(`/`);
            window.location.reload();
        }
    }, [userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors(validate(values));
        dispatch(signin(values.email, values.password));
    };

    return (
        <>
            <div className='formL-container'>
                <div className='formL-content-right'>
                    <form onSubmit={handleSubmit} className='formL' noValidate>
                        <h1>
                            Login
                            </h1>

                        <div className='formL-inputs'>
                            <label className='formL-label'>Email</label>
                            <input
                                className='formL-input'
                                type='email'
                                name='email'
                                placeholder='Enter your email'
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div className='formL-inputs'>
                            <label className='formL-label'>Password</label>
                            <input
                                className='formL-input'
                                type='password'
                                name='password'
                                placeholder='Enter your password'
                                value={values.password}
                                onChange={handleChange}
                            />
                            {/* {errors.password && <p>{errors.password}</p>} */}
                        </div>

                        <button className='formL-input-btn' type='submit'>
                            Login
                      </button>
                        <span className='formL-input-login'>
                            New customer? SignUp <a href='/FormSignup'>here</a>
                        </span>
                    </form>
                </div>

            </div>
        </>
    );
}

